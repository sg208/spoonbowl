export const SITE_NAME = "Spoonbowl"

export const formatPageTitle = (title: string): string => `${title} | ${SITE_NAME}`

export const formatRecipeTitle = (recipeName: string): string =>
  `${recipeName} Recipe | ${SITE_NAME}`

export const getBrowserCanonicalUrl = (): string | null => {
  if (typeof window === "undefined") return null
  return window.location.origin + window.location.pathname
}
