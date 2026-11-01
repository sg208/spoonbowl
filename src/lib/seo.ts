export const SITE_NAME = "Spoonbowl"
export const SITE_URL = "https://spoonbowl.engg.app"

export const formatPageTitle = (title: string): string => `${title} | ${SITE_NAME}`

export const formatRecipeTitle = (recipeName: string): string =>
  `${recipeName} Recipe | ${SITE_NAME}`

export const toAbsoluteUrl = (path: string): string => new URL(path, SITE_URL).href
