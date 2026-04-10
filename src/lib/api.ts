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

const BASE_URL = "https://dummyjson.com/recipes"

export async function fetchRecipes(limit = 50, skip = 0): Promise<RecipesResponse> {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return res.json()
}

export async function fetchAllRecipes(): Promise<RecipesResponse> {
  const res = await fetch(`${BASE_URL}?limit=0`)
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return res.json()
}

export async function fetchRecipe(id: number): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch recipe ${id}`)
  return res.json()
}

export async function fetchTags(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/tags`)
  if (!res.ok) throw new Error("Failed to fetch recipe tags")
  return res.json()
}

export async function fetchRecipesByTag(tag: string): Promise<RecipesResponse> {
  const res = await fetch(`${BASE_URL}/tag/${encodeURIComponent(tag)}`)
  if (!res.ok) throw new Error(`Failed to fetch recipes for tag: ${tag}`)
  return res.json()
}

export async function fetchMealTypes(): Promise<string[]> {
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

export async function fetchRecipesByMealType(mealType: string): Promise<RecipesResponse> {
  const res = await fetch(`${BASE_URL}/meal-type/${encodeURIComponent(mealType)}`)
  if (!res.ok) throw new Error(`Failed to fetch recipes for meal type: ${mealType}`)
  return res.json()
}
