import { filterRecipes, type SearchEntry } from "@/lib/search/filterRecipes"

const INDEX_URL = "/search-index.json"
// WHY: a stalled connection would leave the load promise pending and search dead until reload.
const INDEX_TIMEOUT_MS = 10_000

export const initSearch = (root: HTMLElement): void => {
  const input = root.querySelector<HTMLInputElement>("[data-search-input]")
  const list = root.querySelector<HTMLElement>("[data-search-list]")
  const empty = root.querySelector<HTMLElement>("[data-search-empty]")
  const status = root.querySelector<HTMLElement>("[data-search-status]")
  const clear = root.querySelector<HTMLButtonElement>("[data-search-clear]")
  if (!input || !list || !empty || !status || !clear) return

  const state: { index: SearchEntry[] | null; loading: Promise<void> | null; active: number } = {
    index: null,
    loading: null,
    active: -1,
  }

  const getOptions = (): HTMLElement[] => [...list.querySelectorAll<HTMLElement>('[role="option"]')]

  const setActive = (activeIndex: number): void => {
    const options = getOptions()
    options.forEach((option, i) => option.setAttribute("aria-selected", String(i === activeIndex)))
    state.active = activeIndex
    const id = options[activeIndex]?.id
    if (id) input.setAttribute("aria-activedescendant", id)
    else input.removeAttribute("aria-activedescendant")
  }

  const close = (): void => {
    list.hidden = true
    list.replaceChildren()
    empty.hidden = true
    status.textContent = ""
    input.setAttribute("aria-expanded", "false")
    setActive(-1)
  }

  const render = (matches: SearchEntry[]): void => {
    list.replaceChildren(
      ...matches.map((match, i) => {
        const item = document.createElement("div")
        item.id = `search-option-${i}`
        item.setAttribute("role", "option")
        item.setAttribute("aria-selected", "false")
        const link = document.createElement("a")
        link.href = match.path
        link.tabIndex = -1
        link.textContent = `${match.name} · ${match.cuisine}`
        item.append(link)
        return item
      })
    )
    const hasMatches = matches.length > 0
    list.hidden = !hasMatches
    empty.hidden = hasMatches
    input.setAttribute("aria-expanded", String(hasMatches))
    status.textContent = hasMatches
      ? `${matches.length} ${matches.length === 1 ? "recipe" : "recipes"}`
      : "No recipes match"
    setActive(-1)
  }

  const fetchIndex = async (): Promise<void> => {
    try {
      const response = await fetch(INDEX_URL, { signal: AbortSignal.timeout(INDEX_TIMEOUT_MS) })
      if (!response.ok) throw new Error(`search index HTTP ${response.status}`)
      // same-origin build artefact; shape defined by search-index.json.ts
      state.index = (await response.json()) as SearchEntry[]
    } catch {
      state.loading = null // allow retry on next input
    }
  }

  const load = (): Promise<void> => {
    state.loading ??= fetchIndex()
    return state.loading
  }

  const syncClear = (): void => {
    clear.hidden = input.value === ""
  }

  const handleClear = (): void => {
    input.value = ""
    syncClear()
    close()
    input.focus()
  }

  const handleInput = async (): Promise<void> => {
    syncClear()
    if (!input.value.trim()) return close()
    await load()
    if (state.index) render(filterRecipes(state.index, input.value))
    else status.textContent = "Search is unavailable. Keep typing to retry."
  }

  const handleArrow = (event: KeyboardEvent, step: 1 | -1): void => {
    const count = getOptions().length
    if (count === 0) return
    event.preventDefault()
    setActive((state.active + step + count) % count)
  }

  const handleEnter = (event: KeyboardEvent): void => {
    const options = getOptions()
    const href = options[Math.max(state.active, 0)]?.querySelector("a")?.href
    event.preventDefault()
    if (href && options.length > 0) window.location.assign(href)
  }

  const handleEscape = (event: KeyboardEvent): void => {
    if (!list.hidden || !empty.hidden || input.value) event.preventDefault()
    input.value = ""
    syncClear()
    close()
  }

  const keyHandlers: Record<string, (event: KeyboardEvent) => void> = {
    ArrowDown: (event) => handleArrow(event, 1),
    ArrowUp: (event) => handleArrow(event, -1),
    Enter: handleEnter,
    Escape: handleEscape,
  }

  const handleKeydown = (event: KeyboardEvent): void => {
    keyHandlers[event.key]?.(event)
  }

  input.addEventListener("focus", () => void load())
  input.addEventListener("input", () => void handleInput())
  input.addEventListener("keydown", handleKeydown)
  clear.addEventListener("click", handleClear)
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) close()
  })
}
