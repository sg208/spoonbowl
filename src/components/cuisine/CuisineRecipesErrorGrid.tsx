import { Link } from "@tanstack/react-router"
import { ArrowLeft, ChefHat } from "lucide-react"
import type { Recipe } from "@/lib/api"
import { RecipeCard } from "@/components/RecipeCard"
import { RecipeCardSkeleton } from "@/components/RecipeCardSkeleton"
import { Button } from "@/components/ui/button"

type CuisineRecipesErrorGridProps = {
  cuisine: string
  pageTitle: string
  isError: boolean
  isLoading: boolean
  recipes: Recipe[]
  prefetchCuisinesIndex: () => void
}

export const CuisineRecipesErrorGrid = ({
  cuisine,
  pageTitle,
  isError,
  isLoading,
  recipes,
  prefetchCuisinesIndex,
}: CuisineRecipesErrorGridProps) => (
  <>
    {isError && (
      <div
        role="alert"
        className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center"
      >
        <ChefHat className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
        <p className="text-destructive font-medium">Failed to load recipes for "{cuisine}"</p>
        <p className="text-sm text-muted-foreground mt-1">Please try again.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link
            to="/recipes/cuisines"
            onMouseEnter={prefetchCuisinesIndex}
            onFocus={prefetchCuisinesIndex}
          >
            Back to Cuisines
          </Link>
        </Button>
      </div>
    )}

    {!isError && (
      <>
        {(isLoading || recipes.length > 0) && (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label={`${pageTitle} recipe grid`}
          >
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => <RecipeCardSkeleton key={index} />)
              : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        )}

        {!isLoading && recipes.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            role="status"
          >
            <ChefHat className="h-14 w-14 text-muted-foreground mb-4" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-foreground">
              No recipes found for "{cuisine}"
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Try exploring other cuisines.</p>
            <Button asChild variant="outline" className="mt-5 gap-2">
              <Link
                to="/recipes/cuisines"
                onMouseEnter={prefetchCuisinesIndex}
                onFocus={prefetchCuisinesIndex}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Browse Cuisines
              </Link>
            </Button>
          </div>
        )}
      </>
    )}
  </>
)
