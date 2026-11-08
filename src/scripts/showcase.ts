export const initShowcase = (root: HTMLElement): void => {
  const photo = root.querySelector<HTMLImageElement>("[data-showcase-photo]")
  const minutes = root.querySelector<HTMLElement>("[data-showcase-minutes]")
  const open = root.querySelector<HTMLAnchorElement>("[data-showcase-open]")
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-showcase-picker] button")]
  if (!photo || !minutes || !open || buttons.length === 0) return

  const showDish = (button: HTMLButtonElement): void => {
    buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)))
    minutes.textContent = button.dataset.minutes ?? ""
    open.href = button.dataset.href ?? open.href
    photo.style.opacity = "0"
    const next = new Image()
    next.onload = () => {
      photo.src = next.src
      photo.alt = button.dataset.name ?? ""
      photo.style.opacity = "1"
    }
    next.onerror = () => {
      photo.style.opacity = "1"
    }
    next.src = button.dataset.image ?? photo.src
  }

  buttons.forEach((button) => button.addEventListener("click", () => showDish(button)))
}
