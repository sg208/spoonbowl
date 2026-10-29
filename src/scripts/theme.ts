const STORAGE_KEY = "spoonbowl-theme"
const THEME_COLORS = { dark: "#150a06", light: "#f6f1ec" } as const

type Theme = keyof typeof THEME_COLORS

const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme])
  document
    .querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")
    .forEach((button) => button.setAttribute("aria-pressed", String(theme === "dark")))
}

const getCurrentTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark"

const handleToggleClick = (): void => {
  const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark"
  applyTheme(nextTheme)
  try {
    localStorage.setItem(STORAGE_KEY, nextTheme)
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this page.
  }
}

applyTheme(getCurrentTheme())
document
  .querySelectorAll("[data-theme-toggle]")
  .forEach((button) => button.addEventListener("click", handleToggleClick))
