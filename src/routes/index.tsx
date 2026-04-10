import { createFileRoute } from "@tanstack/react-router"
import { useMemo } from "react"
import { fetchFeaturedRecipe, fetchRecipes } from "@/lib/api"
import { getRandomHeading } from "@/lib/headings"
import { RecipeCard, RecipeCardSkeleton, EmptyRecipes } from "@/components/RecipeCard"
import { FeaturedRecipe, FeaturedRecipeSkeleton } from "@/components/FeaturedRecipe"
import { useFeaturedRecipe, useRecipeGrid } from "@/hooks/use-recipe-queries"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import type { Recipe } from "@/lib/api"

const pickRandom = <T,>(arr: T[], count: number): T[] => {
  if (arr.length <= count) return [...arr]
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const HomePage = () => {
  const heading = useMemo(() => getRandomHeading(), [])

  const {
    data: featured,
    isLoading: isFeaturedLoading,
    isError: isFeaturedError,
  } = useFeaturedRecipe()

  const { data, isLoading: isGridLoading, isError: isGridError } = useRecipeGrid(48, 0)

  const displayRecipes = useMemo<Recipe[]>(() => {
    if (!data?.recipes?.length) return []
    return pickRandom(data.recipes, 48)
  }, [data?.recipes])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <section aria-labelledby="page-heading" className="mb-10">
        <h1
          id="page-heading"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
        >
          {heading}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore hundreds of delicious recipes, from quick weeknight dinners to impressive weekend
          feasts.
        </p>
      </section>

      <section aria-labelledby="featured-section-label" className="mb-12">
        <h2 id="featured-section-label" className="sr-only">
          Featured Recipe
        </h2>
        {isFeaturedLoading ? (
          <FeaturedRecipeSkeleton />
        ) : isFeaturedError || !featured ? (
          <div
            className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground"
            role="alert"
          >
            Unable to load featured recipe. Please try again.
          </div>
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
          {!isGridLoading && data && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing {displayRecipes.length} of {data.total} recipes
            </p>
          )}
        </div>

        {isGridError && (
          <div role="alert" className="text-destructive text-center py-10">
            Failed to load recipes. Please refresh the page.
          </div>
        )}

        {!isGridError && (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label="Recipe grid"
          >
            {isGridLoading ? (
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
    Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: recipeKeys.featured(),
        queryFn: fetchFeaturedRecipe,
      }),
      context.queryClient.ensureQueryData({
        queryKey: recipeKeys.grid({ limit: 48, skip: 0 }),
        queryFn: () => fetchRecipes(48, 0),
      }),
    ]),
  component: HomePage,
})
