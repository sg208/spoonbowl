export const browseLinks = [
  { id: "recipes", to: "/", label: "Recipes" },
  { id: "categories", to: "/recipes/tags/", label: "Categories" },
  { id: "mealTypes", to: "/recipes/meal-types/", label: "Meal Types" },
  { id: "cuisines", to: "/recipes/cuisines/", label: "Cuisines" },
  { id: "difficulties", to: "/recipes/difficulties/", label: "By Difficulty" },
] as const

export const siteLinks = [
  { to: "/about/", label: "About" },
  { to: "/privacy/", label: "Privacy" },
  { to: "/terms/", label: "Terms of use" },
  { to: "/disclaimer/", label: "Disclaimer" },
  { to: "/accessibility/", label: "Accessibility" },
] as const
