// Phone-width disclosure for the primary nav: toggle, Escape closes and returns focus.
export const initNavMenu = (): void => {
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]")
  const panel = document.querySelector<HTMLElement>("[data-nav-panel]")
  if (!toggle || !panel) return

  const setOpen = (isOpen: boolean): void => {
    toggle.setAttribute("aria-expanded", String(isOpen))
    panel.classList.toggle("is-open", isOpen)
  }

  const handleToggle = (): void => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true")
  }

  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true") return
    setOpen(false)
    toggle.focus()
  }

  toggle.addEventListener("click", handleToggle)
  document.addEventListener("keydown", handleKeydown)
}
