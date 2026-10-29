import type { Recipe } from "@/lib/api"

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")

export const recipePath = (recipe: Pick<Recipe, "id" | "name">): string =>
  `/recipe/${recipe.id}/${slugify(recipe.name)}/`

const hyphenate = (text: string): string => text.toLowerCase().replace(/\s+/g, "-")

export const cuisineToSlug = hyphenate
export const tagToSlug = hyphenate
export const mealTypeToSlug = hyphenate
export const difficultyToSlug = (difficulty: string): string => difficulty.toLowerCase()
