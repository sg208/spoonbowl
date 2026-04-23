import { createFileRoute, notFound } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { fetchRecipesByCuisine, fetchCuisines } from "@/lib/api"
import {
  getCuisineEmoji,
  getCuisineDescription,
  cuisineToPageTitle,
  slugToCuisine,
  cuisineToSlug,
} from "@/lib/utils/cuisineUtils"
import { recipeKeys, recipeMetaKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"
import { useRecipesByCuisine } from "@/hooks/useRecipeQueries"
import { usePrefetchCuisinesIndex } from "@/hooks/usePrefetchCuisinesIndex"
import { CuisineRecipesBreadcrumb } from "@/components/cuisine/CuisineRecipesBreadcrumb"
import { CuisineRecipesHeader } from "@/components/cuisine/CuisineRecipesHeader"
import { CuisineRecipesErrorGrid } from "@/components/cuisine/CuisineRecipesErrorGrid"
import { CuisineRecipesSeoAndRelated } from "@/components/cuisine/CuisineRecipesSeoAndRelated"

const CuisineRecipesPage = () => {
  const { cuisine, allCuisines } = Route.useLoaderData()
  const queryClient = useQueryClient()
  const prefetchCuisinesIndex = usePrefetchCuisinesIndex()

  const pageTitle = cuisineToPageTitle(cuisine)
  const description = getCuisineDescription(cuisine)
  const emoji = getCuisineEmoji(cuisine)

  const { data, isLoading, isError } = useRecipesByCuisine(cuisine, true)

  const recipes = data?.recipes ?? []

  const prefetchCuisine = useCallback(
    (name: string) => {
      queryClient.prefetchQuery({
        queryKey: recipeKeys.byCuisine(name),
        queryFn: () => fetchRecipesByCuisine(name),
        staleTime: STALE_TIME_5M_MS,
      })
    },
    [queryClient]
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Helmet>
        <title>{pageTitle} Recipes – Spoonbowl</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta property="og:title" content={`${pageTitle} Recipes – Spoonbowl`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={window.location.origin + window.location.pathname} />
      </Helmet>
      <CuisineRecipesBreadcrumb
        pageTitle={pageTitle}
        prefetchCuisinesIndex={prefetchCuisinesIndex}
      />
      <CuisineRecipesHeader
        cuisine={cuisine}
        emoji={emoji}
        pageTitle={pageTitle}
        description={description}
        isLoading={isLoading}
        data={data}
      />
      <CuisineRecipesErrorGrid
        cuisine={cuisine}
        pageTitle={pageTitle}
        isError={isError}
        isLoading={isLoading}
        recipes={recipes}
        prefetchCuisinesIndex={prefetchCuisinesIndex}
      />
      <CuisineRecipesSeoAndRelated
        pageTitle={pageTitle}
        description={description}
        total={data?.total}
        recipes={recipes}
        cuisine={cuisine}
        allCuisines={allCuisines}
        getCuisineEmoji={getCuisineEmoji}
        prefetchCuisine={prefetchCuisine}
        prefetchCuisinesIndex={prefetchCuisinesIndex}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}

export const Route = createFileRoute("/recipes/cuisine/$cuisine")({
  loader: async ({ context, params }) => {
    const cuisineSlug = params.cuisine
    const allCuisines = await context.queryClient.ensureQueryData({
      queryKey: recipeMetaKeys.cuisines(),
      queryFn: fetchCuisines,
    })
    if (!allCuisines.some((c) => cuisineToSlug(c) === cuisineSlug)) {
      throw notFound()
    }
    const cuisine = slugToCuisine(cuisineSlug, allCuisines)
    return { cuisine, allCuisines }
  },
  component: CuisineRecipesPage,
})
