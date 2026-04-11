export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}

export type RecipeCuisineSummary = Pick<Recipe, "id" | "name" | "cuisine">

interface RecipesCuisineSelectResponse {
  recipes: RecipeCuisineSummary[]
  total: number
  skip: number
  limit: number
}

const BASE_URL = "https://dummyjson.com/recipes"

export const fetchRecipes = async (limit = 50, skip = 0): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return res.json()
}

export const fetchAllRecipes = async (): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}?limit=0`)
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return res.json()
}

export const fetchRecipe = async (id: number): Promise<Recipe> => {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch recipe ${id}`)
  return res.json()
}

export const fetchFeaturedRecipe = async (): Promise<Recipe> => {
  // Deterministic featured recipe enables preloading its hero image for LCP.
  return fetchRecipe(38)
}

export const fetchTags = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/tags`)
  if (!res.ok) throw new Error("Failed to fetch recipe tags")
  return res.json()
}

export const fetchRecipesByTag = async (tag: string): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}/tag/${encodeURIComponent(tag)}`)
  if (!res.ok) throw new Error(`Failed to fetch recipes for tag: ${tag}`)
  return res.json()
}

export const fetchMealTypes = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=0`)
  if (!res.ok) throw new Error("Failed to fetch recipes for meal types")
  const data: RecipesResponse = await res.json()
  const types = new Set<string>()
  for (const recipe of data.recipes) {
    for (const t of recipe.mealType) {
      types.add(t)
    }
  }
  return Array.from(types).sort()
}

export const fetchRecipesByMealType = async (mealType: string): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}/meal-type/${encodeURIComponent(mealType)}`)
  if (!res.ok) throw new Error(`Failed to fetch recipes for meal type: ${mealType}`)
  return res.json()
}

export const fetchCuisines = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=0&select=id,name,cuisine`)
  if (!res.ok) throw new Error("Failed to fetch cuisines")
  const data: RecipesCuisineSelectResponse = await res.json()
  const cuisines = new Set<string>()
  for (const recipe of data.recipes) {
    if (recipe.cuisine) cuisines.add(recipe.cuisine)
  }
  return Array.from(cuisines).sort()
}

export const fetchRecipesByCuisine = async (cuisine: string): Promise<RecipesResponse> => {
  const data = await fetchAllRecipes()
  const recipes = data.recipes.filter((r) => r.cuisine === cuisine)
  return {
    recipes,
    total: recipes.length,
    skip: 0,
    limit: recipes.length,
  }
}

export type RecipeDifficultySummary = Pick<Recipe, "id" | "name" | "difficulty">

interface RecipesDifficultySelectResponse {
  recipes: RecipeDifficultySummary[]
  total: number
  skip: number
  limit: number
}

export const fetchDifficulties = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=0&select=id,name,difficulty`)
  if (!res.ok) throw new Error("Failed to fetch difficulties")
  const data: RecipesDifficultySelectResponse = await res.json()
  const difficulties = new Set<string>()
  for (const recipe of data.recipes) {
    if (recipe.difficulty) difficulties.add(recipe.difficulty)
  }
  const order = ["Easy", "Medium", "Hard"]
  return order.filter((d) => difficulties.has(d))
}

export const fetchRecipesByDifficulty = async (difficulty: string): Promise<RecipesResponse> => {
  const data = await fetchAllRecipes()
  const recipes = data.recipes.filter((r) => r.difficulty === difficulty)
  return { recipes, total: recipes.length, skip: 0, limit: recipes.length }
}
