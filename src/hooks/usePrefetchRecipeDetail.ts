import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { fetchRecipe } from "@/lib/api"
import { recipeDetailKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"

/** Prefetch a single recipe detail query (same key as `/recipe/$recipeId/$slug`). */
export const usePrefetchRecipeDetail = () => {
  const queryClient = useQueryClient()
  return useCallback(
    (id: number) => {
      queryClient.prefetchQuery({
        queryKey: recipeDetailKeys.detail(id),
        queryFn: () => fetchRecipe(id),
        staleTime: STALE_TIME_5M_MS,
      })
    },
    [queryClient]
  )
}
