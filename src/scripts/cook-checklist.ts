import { describeChecked, parseChecked } from "@/lib/cook/checklist"

const storageKey = (recipeId: string): string => `spoonbowl-checked-${recipeId}`

const readStored = (key: string): number[] => {
  try {
    return parseChecked(localStorage.getItem(key))
  } catch {
    return []
  }
}

const writeStored = (key: string, indexes: number[]): void => {
  try {
    if (indexes.length === 0) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(indexes))
  } catch {
    // Storage can be blocked (private mode); ticks still work for this visit.
  }
}

// Ingredient ticks: progress line, Clear button, and per-recipe persistence.
export const initChecklist = (root: HTMLElement): void => {
  const boxes = [...root.querySelectorAll<HTMLInputElement>("[data-check]")]
  const progress = root.querySelector<HTMLElement>("[data-check-progress]")
  const clear = root.querySelector<HTMLButtonElement>("[data-check-clear]")
  if (!progress || !clear || boxes.length === 0) return
  const key = storageKey(root.dataset.recipeId ?? "unknown")

  const render = (): void => {
    const checked = boxes.flatMap((box, index) => (box.checked ? [index] : []))
    progress.textContent = describeChecked(checked.length, boxes.length)
    clear.hidden = checked.length === 0
    writeStored(key, checked)
  }

  const handleClear = (): void => {
    boxes.forEach((box) => {
      box.checked = false
    })
    render()
    boxes[0]?.focus()
  }

  readStored(key).forEach((index) => {
    const box = boxes[index]
    if (box) box.checked = true
  })
  progress.hidden = false
  render()
  boxes.forEach((box) => box.addEventListener("change", render))
  clear.addEventListener("click", handleClear)
}
