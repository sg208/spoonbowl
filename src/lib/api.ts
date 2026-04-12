import { z } from "zod"

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

// Zod schemas for runtime validation
const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number(),
  image: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  mealType: z.array(z.string()),
})

const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type RecipeCuisineSummary = Pick<Recipe, "id" | "name" | "cuisine">

const BASE_URL = "https://dummyjson.com/recipes"

export const fetchRecipes = async (limit = 50, skip = 0): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return RecipesResponseSchema.parse(await res.json())
}

export const fetchAllRecipes = async (): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}?limit=0`)
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return RecipesResponseSchema.parse(await res.json())
}

export const fetchRecipe = async (id: number): Promise<Recipe> => {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch recipe ${id}`)
  return RecipeSchema.parse(await res.json())
}

export const fetchFeaturedRecipe = async (): Promise<Recipe> => {
  // Deterministic featured recipe enables preloading its hero image for LCP.
  return fetchRecipe(38)
}

export const fetchTags = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/tags`)
  if (!res.ok) throw new Error("Failed to fetch recipe tags")
  return z.array(z.string()).parse(await res.json())
}

export const fetchRecipesByTag = async (tag: string): Promise<RecipesResponse> => {
  const res = await fetch(`${BASE_URL}/tag/${encodeURIComponent(tag)}`)
  if (!res.ok) throw new Error(`Failed to fetch recipes for tag: ${tag}`)
  return RecipesResponseSchema.parse(await res.json())
}

export const fetchMealTypes = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=0`)
  if (!res.ok) throw new Error("Failed to fetch recipes for meal types")
  const data = RecipesResponseSchema.parse(await res.json())
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
  return RecipesResponseSchema.parse(await res.json())
}

export const fetchCuisines = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=0&select=id,name,cuisine`)
  if (!res.ok) throw new Error("Failed to fetch cuisines")
  const RecipesCuisineSelectSchema = z.object({
    recipes: z.array(
      z.object({ id: z.number(), name: z.string(), cuisine: z.string().optional() })
    ),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
  })
  const data = RecipesCuisineSelectSchema.parse(await res.json())
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

export const fetchDifficulties = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}?limit=0&select=id,name,difficulty`)
  if (!res.ok) throw new Error("Failed to fetch difficulties")
  const RecipesDifficultySelectSchema = z.object({
    recipes: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
      })
    ),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
  })
  const data = RecipesDifficultySelectSchema.parse(await res.json())
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
