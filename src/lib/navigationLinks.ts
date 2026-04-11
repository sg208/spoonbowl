export const browseLinks = [
  { id: "recipes", to: "/", label: "Recipes" },
  { id: "categories", to: "/recipes/tags", label: "Categories" },
  { id: "mealTypes", to: "/recipes/meal-types", label: "Meal Types" },
  { id: "cuisines", to: "/recipes/cuisines", label: "Cuisines" },
] as const

export type BrowseLink = (typeof browseLinks)[number]
export type BrowseLinkId = BrowseLink["id"]
