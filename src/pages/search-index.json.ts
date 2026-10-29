import type { APIRoute } from "astro"
import { getCatalog } from "@/lib/catalog"
import type { SearchEntry } from "@/lib/search/filterRecipes"
import { recipePath, slugify } from "@/lib/utils/slug"
import { totalMinutes } from "@/lib/utils/time"

export const prerender = true

export const GET: APIRoute = async () => {
  const { recipes } = await getCatalog()
  const index: SearchEntry[] = recipes.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    slug: slugify(recipe.name),
    path: recipePath(recipe),
    cuisine: recipe.cuisine,
    tags: recipe.tags,
    mealType: recipe.mealType,
    difficulty: recipe.difficulty,
    image: recipe.image,
    totalMinutes: totalMinutes(recipe),
  }))
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  })
}
