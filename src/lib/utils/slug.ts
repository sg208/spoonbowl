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

const titleCase = (slug: string): string =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const slugToName =
  (toSlug: (name: string) => string, fallback: (slug: string) => string) =>
  (slug: string, all?: string[]): string =>
    all?.find((name) => toSlug(name) === slug) ?? fallback(slug)

export const cuisineToSlug = hyphenate
export const tagToSlug = hyphenate
export const mealTypeToSlug = hyphenate
export const difficultyToSlug = (difficulty: string): string => difficulty.toLowerCase()

export const slugToCuisine = slugToName(cuisineToSlug, titleCase)
export const slugToTag = slugToName(tagToSlug, titleCase)
export const slugToMealType = slugToName(mealTypeToSlug, titleCase)
export const slugToDifficulty = slugToName(
  difficultyToSlug,
  (slug) => slug.charAt(0).toUpperCase() + slug.slice(1)
)
