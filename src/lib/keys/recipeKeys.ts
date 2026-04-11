/** Hierarchical React Query keys for recipes and related meta lists. */

export const recipeKeys = {
  all: () => ["recipes"] as const,
  allRecipes: () => [...recipeKeys.all(), "all"] as const,
  byCuisine: (cuisine: string) => [...recipeKeys.all(), "cuisine", cuisine] as const,
  byTag: (tag: string) => [...recipeKeys.all(), "tag", tag] as const,
  byMealType: (mealType: string) => [...recipeKeys.all(), "meal-type", mealType] as const,
  byDifficulty: (difficulty: string) => [...recipeKeys.all(), "difficulty", difficulty] as const,
}

export const recipeDetailKeys = {
  detail: (id: number) => ["recipe", id] as const,
}

export const recipeMetaKeys = {
  cuisines: () => ["cuisines"] as const,
  tags: () => ["tags"] as const,
  mealTypes: () => ["meal-types"] as const,
  difficulties: () => ["difficulties"] as const,
}

export const notFoundKeys = {
  randomRecipe: () => ["not-found", "random-recipe"] as const,
}
