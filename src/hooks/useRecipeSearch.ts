import { useMemo } from "react"
import type { Recipe } from "@/lib/api"

const MAX_RESULTS = 10
const MIN_QUERY_LENGTH = 3

const matchesSearch = (recipe: Recipe, query: string): boolean => {
  const lowerQuery = query.toLowerCase()

  // Check recipe name
  if (recipe.name.toLowerCase().includes(lowerQuery)) return true

  // Check cuisine
  if (recipe.cuisine.toLowerCase().includes(lowerQuery)) return true

  // Check tags
  if (recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) return true

  // Check meal types
  if (recipe.mealType.some((type) => type.toLowerCase().includes(lowerQuery))) return true

  // Check ingredients
  if (recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(lowerQuery)))
    return true

  return false
}

export const useRecipeSearch = (recipes: Recipe[] | undefined, query: string): Recipe[] => {
  return useMemo(() => {
    if (!recipes || query.length < MIN_QUERY_LENGTH) return []
    return recipes.filter((recipe) => matchesSearch(recipe, query)).slice(0, MAX_RESULTS)
  }, [recipes, query])
}
