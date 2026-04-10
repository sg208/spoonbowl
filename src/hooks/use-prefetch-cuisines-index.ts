import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { fetchCuisines } from "@/lib/api"

const STALE_5M = 1000 * 60 * 5

/** Prefetch cuisines list query (same key as `/recipes/cuisines/`). */
export function usePrefetchCuisinesIndex() {
  const queryClient = useQueryClient()
  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["cuisines"],
      queryFn: fetchCuisines,
      staleTime: STALE_5M,
    })
  }, [queryClient])
}
