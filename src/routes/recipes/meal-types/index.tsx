import { createFileRoute, Link } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { UtensilsCrossed, ChefHat, ArrowRight } from "lucide-react"
import { fetchRecipesByMealType } from "@/lib/api"
import { useMealTypes } from "@/hooks/use-recipe-queries"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"
import {
  getMealTypeEmoji,
  getMealTypeDescription,
  mealTypeToSlug,
  mealTypeToPageTitle,
} from "@/lib/mealTypeUtils"
import { Badge } from "@/components/ui/badge"

export const Route = createFileRoute("/recipes/meal-types/")({
  component: MealTypesIndexPage,
})

const MealTypesIndexPage = () => {
  const queryClient = useQueryClient()
  const { data: mealTypes, isLoading, isError } = useMealTypes()

  const prefetchMealType = (mealType: string) => {
    queryClient.prefetchQuery({
      queryKey: recipeKeys.byMealType(mealType),
      queryFn: () => fetchRecipesByMealType(mealType),
      staleTime: STALE_TIME_5M_MS,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="mb-10" aria-labelledby="meal-types-page-heading">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary border-0 font-medium">
            <UtensilsCrossed className="h-3 w-3 mr-1" aria-hidden="true" />
            Browse Meal Types
          </Badge>
        </div>
        <h1
          id="meal-types-page-heading"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
        >
          Recipes by Meal Type
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          Whether you're planning breakfast, a hearty dinner, or a late-night snack — browse recipes
          organized by meal occasion.
        </p>
        {!isLoading && mealTypes && (
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {mealTypes.length} meal types to explore
          </p>
        )}
      </header>

      {isError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive"
        >
          Failed to load meal types. Please refresh the page.
        </div>
      )}

      {isLoading && <MealTypesGridSkeleton />}

      {!isLoading && !isError && mealTypes && (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Meal types"
        >
          {mealTypes.map((mealType) => (
            <li key={mealType}>
              <Link
                to="/recipes/meal-type/$mealType"
                params={{ mealType: mealTypeToSlug(mealType) }}
                onMouseEnter={() => prefetchMealType(mealType)}
                onFocus={() => prefetchMealType(mealType)}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Browse ${mealTypeToPageTitle(mealType)}`}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl"
                  aria-hidden="true"
                >
                  {getMealTypeEmoji(mealType)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors truncate">
                    {mealTypeToPageTitle(mealType)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
                    {getMealTypeDescription(mealType).slice(0, 55)}…
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

      {!isLoading && !isError && !mealTypes?.length && (
        <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
          <ChefHat className="h-14 w-14 text-muted-foreground mb-4" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">No meal types found</h2>
          <p className="text-muted-foreground mt-1 text-sm">Try refreshing the page.</p>
        </div>
      )}

      <section
        className="mt-16 rounded-2xl bg-secondary/60 border border-border p-8 text-center"
        aria-labelledby="seo-section-heading"
      >
        <h2 id="seo-section-heading" className="text-xl font-bold tracking-tight text-foreground">
          All Meal Types on Spoonbowl
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          From morning favorites to late-night indulgences — find the perfect recipe for every
          moment of your day.
        </p>
        {mealTypes && (
          <div
            className="mt-5 flex flex-wrap justify-center gap-2"
            aria-label="All meal type links"
          >
            {mealTypes.map((mealType) => (
              <Link
                key={mealType}
                to="/recipes/meal-type/$mealType"
                params={{ mealType: mealTypeToSlug(mealType) }}
                onMouseEnter={() => prefetchMealType(mealType)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={mealTypeToPageTitle(mealType)}
              >
                <span aria-hidden="true">{getMealTypeEmoji(mealType)}</span>
                {mealTypeToPageTitle(mealType)}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const MealTypesGridSkeleton = () => {
  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading meal types"
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
