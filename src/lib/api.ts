import { z } from "zod"

export const RecipeSchema = z.object({
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

export type Recipe = z.infer<typeof RecipeSchema>

const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

const RECIPES_URL = "https://dummyjson.com/recipes?limit=0"
// WHY: a hung DummyJSON would otherwise stall the build (and deploy) forever.
const FETCH_TIMEOUT_MS = 30_000

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(RECIPES_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
  if (!response.ok) throw new Error(`Failed to fetch recipes: HTTP ${response.status}`)
  return RecipesResponseSchema.parse(await response.json()).recipes
}
