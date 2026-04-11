import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"
import { fetchAllRecipes } from "@/lib/api"
import { getRandomHeading } from "@/lib/headings"
import { RecipeCard } from "@/components/RecipeCard"
import { RecipeCardSkeleton } from "@/components/RecipeCardSkeleton"
import { EmptyRecipes } from "@/components/EmptyRecipes"
import { FeaturedRecipe, FeaturedRecipeSkeleton } from "@/components/FeaturedRecipe"
import { useAllRecipes } from "@/hooks/use-recipe-queries"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import type { Recipe } from "@/lib/api"

const GRID_SIZE = 48
const FEATURED_RECIPE_SESSION_KEY = "spoonbowl:home-featured-recipe-id"

const pickRandom = <T,>(arr: T[], count: number): T[] => {
  if (arr.length <= count) return [...arr]
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const getSessionFeaturedRecipeId = (recipes: Recipe[]): number | null => {
  if (typeof window === "undefined" || recipes.length === 0) return null

  const savedId = window.sessionStorage.getItem(FEATURED_RECIPE_SESSION_KEY)
  const parsedId = Number(savedId)
  if (Number.isInteger(parsedId) && recipes.some((recipe) => recipe.id === parsedId)) {
    return parsedId
  }

  const randomRecipe = pickRandom(recipes, 1)[0]
  if (!randomRecipe) return null

  window.sessionStorage.setItem(FEATURED_RECIPE_SESSION_KEY, String(randomRecipe.id))
  return randomRecipe.id
}

const HomePage = () => {
  const heading = useMemo(() => getRandomHeading(), [])
  const { data, isLoading, isError } = useAllRecipes()
  const recipes = useMemo<Recipe[]>(() => data?.recipes ?? [], [data?.recipes])
  const [featured, setFeatured] = useState<Recipe | null>(null)

  useEffect(() => {
    if (!recipes.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync featured selection from current recipe payload.
      setFeatured(null)
      return
    }
    const featuredId = getSessionFeaturedRecipeId(recipes)
    setFeatured(recipes.find((recipe) => recipe.id === featuredId) ?? recipes[0] ?? null)
  }, [recipes])

  const displayRecipes = useMemo<Recipe[]>(() => {
    if (!recipes.length) return []

    const pool = featured ? recipes.filter((recipe) => recipe.id !== featured.id) : recipes
    const randomized = pickRandom(pool, GRID_SIZE)
    if (randomized.length === GRID_SIZE || !featured) return randomized
    return [...randomized, featured].slice(0, GRID_SIZE)
  }, [recipes, featured])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-8">
      <section aria-labelledby="page-heading" className="mb-10 text-center lg:mb-8">
        <div className="mx-auto max-w-3xl">
          <h1
            id="page-heading"
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            {heading}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Explore delicious recipes, from quick weeknight dinners to impressive weekend feasts.
          </p>
        </div>
      </section>

      <section aria-labelledby="featured-section-label" className="mb-12">
        <h2 id="featured-section-label" className="sr-only">
          Featured Recipe
        </h2>
        {isLoading ? (
          <FeaturedRecipeSkeleton />
        ) : isError ? (
          <div
            className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground"
            role="alert"
          >
            Unable to load featured recipe. Please try again.
          </div>
        ) : !featured ? (
          <FeaturedRecipeSkeleton />
        ) : (
          <FeaturedRecipe recipe={featured} />
        )}
      </section>

      <section aria-labelledby="recipes-section-label">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            id="recipes-section-label"
            className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            All Recipes
          </h2>
          {!isLoading && data && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing {displayRecipes.length} of {data.total} recipes
            </p>
          )}
        </div>

        {isError && (
          <div role="alert" className="text-destructive text-center py-10">
            Failed to load recipes. Please refresh the page.
          </div>
        )}

        {!isError && (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label="Recipe grid"
          >
            {isLoading ? (
              Array.from({ length: 12 }).map((_, i) => <RecipeCardSkeleton key={i} />)
            ) : displayRecipes.length === 0 ? (
              <EmptyRecipes />
            ) : (
              displayRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: recipeKeys.allRecipes(),
      queryFn: fetchAllRecipes,
    }),
  component: HomePage,
})
