import { QueryClient } from "@tanstack/react-query"

/** Matches default query stale time; use for explicit prefetch staleTime. */
export const STALE_TIME_5M_MS = 5 * 60 * 1000

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_5M_MS,
      gcTime: 6 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})
