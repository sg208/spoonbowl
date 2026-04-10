import { createFileRoute } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { fetchRecipesByCuisine } from "@/lib/api"
import {
  getCuisineEmoji,
  getCuisineDescription,
  cuisineToPageTitle,
  slugToCuisine,
} from "@/lib/cuisineUtils"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"
import { useCuisines, useRecipesByCuisine } from "@/hooks/use-recipe-queries"
import { usePrefetchCuisinesIndex } from "@/hooks/use-prefetch-cuisines-index"
import { CuisineRecipesBreadcrumb } from "@/components/cuisine/CuisineRecipesBreadcrumb"
import { CuisineRecipesHeader } from "@/components/cuisine/CuisineRecipesHeader"
import { CuisineRecipesErrorGrid } from "@/components/cuisine/CuisineRecipesErrorGrid"
import { CuisineRecipesSeoAndRelated } from "@/components/cuisine/CuisineRecipesSeoAndRelated"

const CuisineRecipesPage = () => {
  const { cuisine: cuisineSlug } = Route.useParams()
  const queryClient = useQueryClient()
  const prefetchCuisinesIndex = usePrefetchCuisinesIndex()

  const { data: allCuisines, isFetched: cuisinesFetched } = useCuisines()

  const cuisine = slugToCuisine(cuisineSlug, allCuisines)
  const pageTitle = cuisineToPageTitle(cuisine)
  const description = getCuisineDescription(cuisine)
  const emoji = getCuisineEmoji(cuisine)

  const { data, isLoading, isError } = useRecipesByCuisine(
    cuisine,
    Boolean(cuisine) && cuisinesFetched
  )

  const recipes = data?.recipes ?? []

  const prefetchCuisine = (name: string) => {
    queryClient.prefetchQuery({
      queryKey: recipeKeys.byCuisine(name),
      queryFn: () => fetchRecipesByCuisine(name),
      staleTime: STALE_TIME_5M_MS,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
  component: CuisineRecipesPage,
})
