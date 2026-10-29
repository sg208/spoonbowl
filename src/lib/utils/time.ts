import type { Recipe } from "@/lib/api"

export const totalMinutes = (recipe: Pick<Recipe, "prepTimeMinutes" | "cookTimeMinutes">): number =>
  recipe.prepTimeMinutes + recipe.cookTimeMinutes
