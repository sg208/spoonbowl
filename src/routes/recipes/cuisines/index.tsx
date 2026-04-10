import { createFileRoute, Link } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { Globe, ChefHat, ArrowRight } from "lucide-react"
import { fetchRecipesByCuisine } from "@/lib/api"
import { useCuisines } from "@/hooks/use-recipe-queries"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"
import {
  getCuisineEmoji,
  getCuisineDescription,
  cuisineToSlug,
  cuisineToPageTitle,
} from "@/lib/cuisineUtils"
import { Badge } from "@/components/ui/badge"

const CuisinesIndexPage = () => {
  const queryClient = useQueryClient()
  const { data: cuisines, isLoading, isError } = useCuisines()

  const prefetchCuisine = (cuisine: string) => {
    queryClient.prefetchQuery({
      queryKey: recipeKeys.byCuisine(cuisine),
      queryFn: () => fetchRecipesByCuisine(cuisine),
      staleTime: STALE_TIME_5M_MS,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="mb-10" aria-labelledby="cuisines-page-heading">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary border-0 font-medium">
            <Globe className="h-3 w-3 mr-1" aria-hidden="true" />
            Browse Cuisines
          </Badge>
        </div>
        <h1
          id="cuisines-page-heading"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
        >
          Recipes by Cuisine
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          Travel the world from your kitchen — explore recipes grouped by regional and cultural
          cooking styles.
        </p>
        {!isLoading && cuisines && (
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {cuisines.length} cuisines to explore
          </p>
        )}
      </header>

      {isError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive"
        >
          Failed to load cuisines. Please refresh the page.
        </div>
      )}

      {isLoading && <CuisinesGridSkeleton />}

      {!isLoading && !isError && cuisines && (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Cuisines"
        >
          {cuisines.map((cuisine) => (
            <li key={cuisine}>
              <Link
                to="/recipes/cuisine/$cuisine"
                params={{ cuisine: cuisineToSlug(cuisine) }}
                onMouseEnter={() => prefetchCuisine(cuisine)}
                onFocus={() => prefetchCuisine(cuisine)}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Browse ${cuisineToPageTitle(cuisine)}`}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl"
                  aria-hidden="true"
                >
                  {getCuisineEmoji(cuisine)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors truncate">
                    {cuisineToPageTitle(cuisine)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
                    {getCuisineDescription(cuisine).slice(0, 55)}…
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !isError && !cuisines?.length && (
        <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
          <ChefHat className="h-14 w-14 text-muted-foreground mb-4" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">No cuisines found</h2>
          <p className="text-muted-foreground mt-1 text-sm">Try refreshing the page.</p>
        </div>
      )}

      <section
        className="mt-16 rounded-2xl bg-secondary/60 border border-border p-8 text-center"
        aria-labelledby="cuisines-seo-section-heading"
      >
        <h2
          id="cuisines-seo-section-heading"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          All Cuisines on Spoonbowl
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          From weeknight comfort to celebration dishes — browse by cuisine and find your next
          favorite recipe.
        </p>
        {cuisines && (
          <div className="mt-5 flex flex-wrap justify-center gap-2" aria-label="All cuisine links">
            {cuisines.map((cuisine) => (
              <Link
                key={cuisine}
                to="/recipes/cuisine/$cuisine"
                params={{ cuisine: cuisineToSlug(cuisine) }}
                onMouseEnter={() => prefetchCuisine(cuisine)}
                onFocus={() => prefetchCuisine(cuisine)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={cuisineToPageTitle(cuisine)}
              >
                <span aria-hidden="true">{getCuisineEmoji(cuisine)}</span>
                {cuisineToPageTitle(cuisine)}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const CuisinesGridSkeleton = () => {
  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading cuisines"
      role="list"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i}>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="h-12 w-12 rounded-lg bg-muted animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 bg-muted rounded animate-pulse" />
              <div className="h-3 w-40 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export const Route = createFileRoute("/recipes/cuisines/")({
  component: CuisinesIndexPage,
})
