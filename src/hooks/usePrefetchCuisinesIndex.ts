import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { fetchCuisines } from "@/lib/api"
import { recipeMetaKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"

/** Prefetch cuisines list query (same key as `/recipes/cuisines/`). */
export const usePrefetchCuisinesIndex = () => {
  const queryClient = useQueryClient()
  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: recipeMetaKeys.cuisines(),
      queryFn: fetchCuisines,
      staleTime: STALE_TIME_5M_MS,
    })
  }, [queryClient])
}
