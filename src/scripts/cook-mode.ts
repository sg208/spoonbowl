import { describePosition } from "@/lib/cook/pager"
import { clampServings, MAX_SERVINGS, MIN_SERVINGS, scaleIngredient } from "@/lib/cook/scale"
import { createWakeLock } from "@/lib/cook/wakeLock"

const MISE_TEXT = "Gather everything and check off your ingredients."

const createBrowserWakeLock = () =>
  createWakeLock({
    wakeLock: "wakeLock" in navigator ? navigator.wakeLock : undefined, // navigator.wakeLock
    visibilityState: () => document.visibilityState,
    onVisibilityChange: (listener) => {
      document.addEventListener("visibilitychange", listener) // re-acquire when tab is visible again
      return () => document.removeEventListener("visibilitychange", listener)
    },
  })

export const initCookMode = (root: HTMLElement): void => {
  const find = <T extends HTMLElement>(selector: string): T | null =>
    root.querySelector<T>(selector)
  const servingsBox = find("[data-cook-servings]")
  const count = find("[data-servings-count]")
  const kcalTotal = find("[data-kcal-total]")
  const servingsStatus = find("[data-servings-status]")
  const note = find("[data-amounts-note]")
  const minus = find<HTMLButtonElement>("[data-servings-minus]")
  const plus = find<HTMLButtonElement>("[data-servings-plus]")
  const start = find<HTMLButtonElement>("[data-cook-start]")
  const pager = find("[data-cook-pager]")
  const counter = find("[data-pager-counter]")
  const text = find("[data-pager-text]")
  const pagerStatus = find("[data-pager-status]")
  const prev = find<HTMLButtonElement>("[data-pager-prev]")
  const next = find<HTMLButtonElement>("[data-pager-next]")
  const exit = find<HTMLButtonElement>("[data-pager-exit]")
  const wakeToggle = find<HTMLButtonElement>("[data-wake-toggle]")
  if (!servingsBox || !count || !kcalTotal || !servingsStatus || !note || !minus || !plus) return
  if (
    !start ||
    !pager ||
    !counter ||
    !text ||
    !pagerStatus ||
    !prev ||
    !next ||
    !exit ||
    !wakeToggle
  )
    return

  const baseServings = Number(root.dataset.baseServings) || 1
  const kcalPerServing = Number(root.dataset.kcal) || 0
  const hasAmounts = root.dataset.hasAmounts === "true"
  const labels = [...root.querySelectorAll<HTMLElement>("[data-ingredient]")]
  const steps = [...root.querySelectorAll<HTMLElement>("[data-steps] > li")].map(
    (item) => item.textContent ?? ""
  )
  const wakeLock = createBrowserWakeLock()
  const state = { servings: baseServings, position: 0, isWakeOn: false }

  const renderServings = (): void => {
    const factor = state.servings / baseServings
    count.textContent = String(state.servings)
    kcalTotal.textContent = String(Math.round(kcalPerServing * state.servings))
    labels.forEach((label) => {
      label.textContent = scaleIngredient(label.dataset.ingredient ?? "", factor)
    })
    minus.disabled = state.servings <= MIN_SERVINGS
    plus.disabled = state.servings >= MAX_SERVINGS
  }

  const handleServings = (delta: number): void => {
    state.servings = clampServings(state.servings + delta)
    renderServings()
    servingsStatus.textContent = `Serves ${state.servings}`
  }

  const renderPager = (): void => {
    const view = describePosition(state.position, steps.length)
    counter.textContent = view.counter
    text.textContent = state.position === 0 ? MISE_TEXT : (steps[state.position - 1] ?? "")
    prev.disabled = view.isFirst
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
    next.focus()
    void setWake(wakeLock.isSupported)
  }

  const handleExit = (): void => {
    delete root.dataset.mode
    pager.hidden = true
    start.hidden = false
    start.focus()
    void setWake(false)
  }

  const handleStep = (delta: number): void => {
    if (delta > 0 && state.position >= steps.length) return handleExit()
    state.position = Math.min(steps.length, Math.max(0, state.position + delta))
    renderPager()
  }

  const handleKeydown = (event: KeyboardEvent): void => {
    if (root.dataset.mode !== "step") return
    if (event.key === "ArrowRight") handleStep(1)
    else if (event.key === "ArrowLeft") handleStep(-1)
  }

  servingsBox.hidden = false
  if (!hasAmounts) note.hidden = false
  start.hidden = false
  wakeToggle.hidden = !wakeLock.isSupported
  renderServings()
  minus.addEventListener("click", () => handleServings(-1))
  plus.addEventListener("click", () => handleServings(1))
  start.addEventListener("click", handleStart)
  exit.addEventListener("click", handleExit)
  prev.addEventListener("click", () => handleStep(-1))
  next.addEventListener("click", () => handleStep(1))
  wakeToggle.addEventListener("click", () => void setWake(!state.isWakeOn))
  root.addEventListener("keydown", handleKeydown)
}
