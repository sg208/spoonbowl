import { fetchAllRecipes, type Recipe } from "@/lib/api"
import { cuisineToSlug, difficultyToSlug, mealTypeToSlug, tagToSlug } from "@/lib/utils/slug"

export interface CatalogGroup {
  name: string
  slug: string
  recipes: Recipe[]
}

export interface Catalog {
  recipes: Recipe[]
  byId: Map<number, Recipe>
  cuisines: CatalogGroup[]
  tags: CatalogGroup[]
  mealTypes: CatalogGroup[]
  difficulties: CatalogGroup[]
  featured: Recipe
}

const FEATURED_RECIPE_ID = 38
const DIFFICULTY_ORDER = ["Easy", "Medium", "Hard"]

const groupBy = (
  recipes: Recipe[],
  getNames: (recipe: Recipe) => string[],
  toSlug: (name: string) => string
): CatalogGroup[] => {
  const groups = new Map<string, CatalogGroup>()
  for (const recipe of recipes) {
    for (const name of getNames(recipe)) {
      const slug = toSlug(name)
      const group = groups.get(slug) ?? { name, slug, recipes: [] }
      if (!group.recipes.includes(recipe)) group.recipes.push(recipe)
      groups.set(slug, group)
    }
  }
  return [...groups.values()].sort((left, right) => left.name.localeCompare(right.name))
}

export const buildCatalog = (recipes: Recipe[]): Catalog => {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]))
  const featured = byId.get(FEATURED_RECIPE_ID) ?? recipes[0]
  if (!featured) throw new Error("Catalog is empty")
  const difficulties = groupBy(recipes, (recipe) => [recipe.difficulty], difficultyToSlug).sort(
    (left, right) => DIFFICULTY_ORDER.indexOf(left.name) - DIFFICULTY_ORDER.indexOf(right.name)
  )
  return {
    recipes,
    byId,
    featured,
    difficulties,
    cuisines: groupBy(recipes, (recipe) => [recipe.cuisine], cuisineToSlug),
    tags: groupBy(recipes, (recipe) => recipe.tags, tagToSlug),
    mealTypes: groupBy(recipes, (recipe) => recipe.mealType, mealTypeToSlug),
  }
}

const loadCatalog = async (): Promise<Catalog> => buildCatalog(await fetchAllRecipes())

const cache: { promise?: Promise<Catalog> } = {}

export const getCatalog = (): Promise<Catalog> => {
  cache.promise ??= loadCatalog()
  return cache.promise
}
