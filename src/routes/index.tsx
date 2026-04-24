import { createFileRoute } from "@tanstack/react-router"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { fetchAllRecipes } from "@/lib/api"
import {
  getSessionRandomText,
  headings,
  recipeSectionHeadings,
  searchHeadings,
} from "@/lib/config/headings"
import { RecipeCard } from "@/components/RecipeCard"
import { RecipeCardSkeleton } from "@/components/RecipeCardSkeleton"
import { EmptyRecipes } from "@/components/EmptyRecipes"
import { FeaturedRecipe, FeaturedRecipeSkeleton } from "@/components/FeaturedRecipe"
import { RecipeSearch } from "@/components/RecipeSearch"
import { useAllRecipes } from "@/hooks/useRecipeQueries"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import type { Recipe } from "@/lib/api"

const GRID_SIZE = 4
const FEATURED_RECIPE_SESSION_KEY = "spoonbowl:home-featured-recipe-id"
const GRID_RECIPE_IDS_SESSION_KEY = "spoonbowl:home-grid-recipe-ids"
const HERO_HEADING_SESSION_KEY = "spoonbowl:home-hero-heading"
const RECIPE_SECTION_HEADING_SESSION_KEY = "spoonbowl:home-recipes-section-heading"
const SEARCH_HEADING_SESSION_KEY = "spoonbowl:home-search-heading"

const pickRandom = <T,>(arr: T[], count: number): T[] => {
  if (arr.length <= count) return [...arr]
  const shuffled = [...arr]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const temp = shuffled[index]
    shuffled[index] = shuffled[randomIndex] as T
    shuffled[randomIndex] = temp
  }
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
  return randomRecipe?.id ?? null
}

const getSessionGridRecipeIds = (
  recipes: Recipe[],
  count: number,
  featuredRecipeId: number | null
): number[] => {
  const candidateRecipes =
    featuredRecipeId === null ? recipes : recipes.filter((recipe) => recipe.id !== featuredRecipeId)
  const candidateIds = candidateRecipes.map((recipe) => recipe.id)

  if (typeof window === "undefined") {
    return pickRandom(candidateIds, count)
  }

  const savedIdsRaw = window.sessionStorage.getItem(GRID_RECIPE_IDS_SESSION_KEY)
  if (savedIdsRaw) {
    try {
      const parsed = JSON.parse(savedIdsRaw)
      if (
        Array.isArray(parsed) &&
        parsed.length === Math.min(count, candidateIds.length) &&
        parsed.every((value) => typeof value === "number") &&
        parsed.every((value) => candidateIds.includes(value)) &&
        new Set(parsed).size === parsed.length
      ) {
        return parsed as number[]
      }
    } catch {
      // Ignore malformed sessionStorage values and regenerate below.
    }
  }

  return pickRandom(candidateIds, count)
}

const HomePage = (): React.JSX.Element => {
  const [isMd, setIsMd] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768)
  const [heading] = useState(() =>
    getSessionRandomText({
      sessionKey: HERO_HEADING_SESSION_KEY,
      texts: headings,
      fallback: "Good food. No excuses needed.",
    })
  )
  const [recipeSectionHeading] = useState(() =>
    getSessionRandomText({
      sessionKey: RECIPE_SECTION_HEADING_SESSION_KEY,
      texts: recipeSectionHeadings,
      fallback: "Four Recipes, Zero Drama.",
    })
  )
  const [searchHeading] = useState(() =>
    getSessionRandomText({
      sessionKey: SEARCH_HEADING_SESSION_KEY,
      texts: searchHeadings,
      fallback: "Find Something Worth Cooking Tonight.",
    })
  )
  const { data, isLoading, isError } = useAllRecipes()

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      setIsMd(mql.matches)
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  const recipes = useMemo<Recipe[]>(() => data?.recipes ?? [], [data?.recipes])
  const featured = useMemo(() => {
    if (recipes.length === 0) return null
    const featuredId = getSessionFeaturedRecipeId(recipes)
    return recipes.find((recipe) => recipe.id === featuredId) ?? recipes[0] ?? null
  }, [recipes])

  const displayRecipes = useMemo<Recipe[]>(() => {
    if (!recipes.length) return []
    const selectedIds = getSessionGridRecipeIds(recipes, GRID_SIZE, featured?.id ?? null)
    return selectedIds
      .map((id) => recipes.find((recipe) => recipe.id === id))
      .filter((recipe): recipe is Recipe => Boolean(recipe))
  }, [recipes, featured?.id])

  useEffect(() => {
    if (featured && typeof window !== "undefined") {
      window.sessionStorage.setItem(FEATURED_RECIPE_SESSION_KEY, String(featured.id))
    }
  }, [featured])

  useEffect(() => {
    if (displayRecipes.length > 0 && typeof window !== "undefined") {
      window.sessionStorage.setItem(
        GRID_RECIPE_IDS_SESSION_KEY,
        JSON.stringify(displayRecipes.map((recipe) => recipe.id))
      )
    }
  }, [displayRecipes])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-8">
      <Helmet>
        <title>Spoonbowl - Recipe Discovery</title>
        <meta
          name="description"
          content="Discover delicious recipes from around the world. Explore cuisines, meal types, and difficulty levels — then cook something worth eating."
        />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta property="og:title" content="Spoonbowl - Recipe Discovery" />
        <meta
          property="og:description"
          content="Discover delicious recipes from around the world. Explore cuisines, meal types, and difficulty levels — then cook something worth eating."
        />
        <meta property="og:url" content={window.location.origin + window.location.pathname} />
      </Helmet>
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
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            No featured recipe available at this time.
          </div>
        ) : (
          <FeaturedRecipe recipe={featured} />
        )}
      </section>

      {isMd && <RecipeSearch recipes={recipes} isLoading={isLoading} heading={searchHeading} />}

      <section aria-labelledby="recipes-section-label" className="mb-12">
        <div className="mb-6 text-center">
          <h2
            id="recipes-section-label"
            className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            {recipeSectionHeading}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            A curated handful to spark tonight's dinner inspiration.
          </p>
        </div>

        {isError && (
          <div role="alert" className="text-destructive text-center py-10">
            Failed to load recipes. Please refresh the page.
          </div>
        )}

        {!isError && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              Array.from({ length: GRID_SIZE }).map((_, index) => (
                <RecipeCardSkeleton key={`skeleton-${index}`} />
              ))
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
