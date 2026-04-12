export const browseLinks = [
  { id: "recipes", to: "/", label: "Recipes" },
  { id: "categories", to: "/recipes/tags/", label: "Categories" },
  { id: "mealTypes", to: "/recipes/meal-types/", label: "Meal Types" },
  { id: "cuisines", to: "/recipes/cuisines/", label: "Cuisines" },
  { id: "difficulties", to: "/recipes/difficulties/", label: "By Difficulty" },
] as const

export type BrowseLink = (typeof browseLinks)[number]
export type BrowseLinkId = BrowseLink["id"]

export const legalLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
  { to: "/disclaimer", label: "Disclaimer" },
] as const

export const accessibilityLinks = [
  { to: "/accessibility", label: "Accessibility Statement" },
] as const
