import { useMemo } from "react"
import type { Recipe } from "@/lib/api"

const MAX_RESULTS = 10
export const MIN_QUERY_LENGTH = 3

const matchesSearch = (recipe: Recipe, normalizedQuery: string): boolean => {
  if (recipe.name.toLowerCase().includes(normalizedQuery)) return true
  if (recipe.cuisine.toLowerCase().includes(normalizedQuery)) return true
  if (recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))) return true
  if (recipe.mealType.some((type) => type.toLowerCase().includes(normalizedQuery))) return true
  if (recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(normalizedQuery)))
    return true
  return false
}

export const useRecipeSearch = (recipes: Recipe[] | undefined, query: string): Recipe[] => {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!recipes || normalizedQuery.length < MIN_QUERY_LENGTH) return []
    return recipes.filter((recipe) => matchesSearch(recipe, normalizedQuery)).slice(0, MAX_RESULTS)
  }, [recipes, query])
}
