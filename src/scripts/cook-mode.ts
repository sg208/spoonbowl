import { describePosition } from "@/lib/cook/pager"
import { clampServings, MAX_SERVINGS, MIN_SERVINGS, scaleIngredient } from "@/lib/cook/scale"
import { createWakeLock } from "@/lib/cook/wakeLock"

const MISE_TEXT = "Gather everything and tick off your ingredients."

const createBrowserWakeLock = () =>
  createWakeLock({
    wakeLock: "wakeLock" in navigator ? navigator.wakeLock : undefined,
    visibilityState: () => document.visibilityState,
    onVisibilityChange: (listener) => {
      document.addEventListener("visibilitychange", listener) // re-acquire when tab is visible again
      return () => document.removeEventListener("visibilitychange", listener)
    },
  })

const queryAll = (root: HTMLElement) => {
  const find = <T extends HTMLElement = HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)
  const parts = {
    servingsBox: find("[data-cook-servings]"),
    count: find("[data-servings-count]"),
    kcalTotal: find("[data-kcal-total]"),
    servingsStatus: find("[data-servings-status]"),
    note: find("[data-amounts-note]"),
    minus: find<HTMLButtonElement>("[data-servings-minus]"),
    plus: find<HTMLButtonElement>("[data-servings-plus]"),
    start: find<HTMLButtonElement>("[data-cook-start]"),
    pager: find("[data-cook-pager]"),
    bar: find("[data-pager-bar]"),
    counter: find("[data-pager-counter]"),
    text: find("[data-pager-text]"),
    pagerStatus: find("[data-pager-status]"),
    prev: find<HTMLButtonElement>("[data-pager-prev]"),
    next: find<HTMLButtonElement>("[data-pager-next]"),
    exit: find<HTMLButtonElement>("[data-pager-exit]"),
    wakeToggle: find<HTMLButtonElement>("[data-wake-toggle]"),
  }
  const isComplete = Object.values(parts).every(Boolean)
  return isComplete
    ? (parts as { [K in keyof typeof parts]: NonNullable<(typeof parts)[K]> })
    : null
}

export const initCookMode = (root: HTMLElement): void => {
  const parts = queryAll(root)
  if (!parts) return
  const { servingsBox, count, kcalTotal, servingsStatus, note, minus, plus, start } = parts
  const { pager, bar, counter, text, pagerStatus, prev, next, exit, wakeToggle } = parts

  const baseServings = Number(root.dataset.baseServings) || 1
  const kcalPerServing = Number(root.dataset.kcal) || 0
  const hasAmounts = root.dataset.hasAmounts === "true"
  const labels = [...root.querySelectorAll<HTMLElement>("[data-ingredient]")]
  const segments = [...bar.children]
  const steps = [...root.querySelectorAll<HTMLElement>("[data-steps] > li")].map(
    (item) => item.textContent ?? ""
  )
  const wakeLock = createBrowserWakeLock()
  const state = { servings: baseServings, position: 0, isWakeOn: false }

  // Disabling the focused button drops focus to <body>; hand it to a sibling first.
  const setDisabled = (button: HTMLButtonElement, isDisabled: boolean, fallback: HTMLElement) => {
    if (isDisabled && document.activeElement === button) fallback.focus()
    button.disabled = isDisabled
  }

  const renderServings = (): void => {
    const factor = state.servings / baseServings
    count.textContent = String(state.servings)
    kcalTotal.textContent = String(Math.round(kcalPerServing * state.servings))
    labels.forEach((label) => {
      label.textContent = scaleIngredient(label.dataset.ingredient ?? "", factor)
    })
    setDisabled(minus, state.servings <= MIN_SERVINGS, plus)
    setDisabled(plus, state.servings >= MAX_SERVINGS, minus)
  }

  const changeServings = (delta: number): void => {
    state.servings = clampServings(state.servings + delta)
    renderServings()
    servingsStatus.textContent = `Serves ${state.servings}`
  }

  const renderPager = (): void => {
    const view = describePosition(state.position, steps.length)
    counter.textContent = view.counter
    text.textContent = state.position === 0 ? MISE_TEXT : (steps[state.position - 1] ?? "")
    segments.forEach((segment, index) =>
      segment.classList.toggle("is-done", index <= state.position)
    )
    setDisabled(prev, view.isFirst, next)
    next.textContent = view.nextLabel
    pagerStatus.textContent = `${view.counter}. ${text.textContent}`
  }

  const setWake = async (isOn: boolean): Promise<void> => {
    state.isWakeOn = isOn ? await wakeLock.acquire() : false
    if (!isOn) await wakeLock.release()
    wakeToggle.setAttribute("aria-pressed", String(state.isWakeOn))
  }

  const handleStart = (): void => {
    state.position = 0
    root.dataset.mode = "step"
    start.hidden = true
    pager.hidden = false
    renderPager()
    // Wide screens keep the checklist beside the step; phones jump straight to the step.
    const scrollTarget = window.matchMedia("(min-width: 900px)").matches ? root : pager
    scrollTarget.scrollIntoView({ block: "start" })
    next.focus({ preventScroll: true })
    void setWake(wakeLock.isSupported)
  }

  const handleExit = (): void => {
    delete root.dataset.mode
    pager.hidden = true
    start.hidden = false
    start.focus()
    void setWake(false)
  }

  const moveStep = (delta: number): void => {
    if (delta > 0 && state.position >= steps.length) return handleExit()
    state.position = Math.min(steps.length, Math.max(0, state.position + delta))
    renderPager()
  }

  const stepKeyActions: Record<string, () => void> = {
    ArrowRight: () => moveStep(1),
    ArrowLeft: () => moveStep(-1),
    Escape: handleExit,
  }

  const handleKeydown = (event: KeyboardEvent): void => {
    if (root.dataset.mode !== "step" || event.altKey || event.ctrlKey || event.metaKey) return
    const action = stepKeyActions[event.key]
    if (!action) return
    action()
    event.preventDefault()
  }

  servingsBox.hidden = false
  if (!hasAmounts) note.hidden = false
  start.hidden = false
  wakeToggle.hidden = !wakeLock.isSupported
  renderServings()
  minus.addEventListener("click", () => changeServings(-1))
  plus.addEventListener("click", () => changeServings(1))
  start.addEventListener("click", handleStart)
  exit.addEventListener("click", handleExit)
  prev.addEventListener("click", () => moveStep(-1))
  next.addEventListener("click", () => moveStep(1))
  wakeToggle.addEventListener("click", () => void setWake(!state.isWakeOn))
  root.addEventListener("keydown", handleKeydown)
}
