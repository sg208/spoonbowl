import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import type { Recipe } from "@/lib/api"
import { cuisineToSlug } from "@/lib/utils/cuisineUtils"
import { Button } from "@/components/ui/button"

type CuisineRecipesSeoAndRelatedProps = {
  pageTitle: string
  description: string
  total: number | undefined
  recipes: Recipe[]
  cuisine: string
  allCuisines: string[] | undefined
  getCuisineEmoji: (name: string) => string
  prefetchCuisine: (name: string) => void
  prefetchCuisinesIndex: () => void
  isLoading: boolean
  isError: boolean
}

export const CuisineRecipesSeoAndRelated = ({
  pageTitle,
  description,
  total,
  recipes,
  cuisine,
  allCuisines,
  getCuisineEmoji,
  prefetchCuisine,
  prefetchCuisinesIndex,
  isLoading,
  isError,
}: CuisineRecipesSeoAndRelatedProps) => (
  <>
    {!isLoading && !isError && recipes.length > 0 && (
      <section
        className="mt-12 rounded-2xl bg-secondary/50 border border-border p-6"
        aria-labelledby="cuisine-seo-meta-heading"
      >
        <h2 id="cuisine-seo-meta-heading" className="text-base font-semibold text-foreground mb-2">
          About {pageTitle}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description} Browse all {total ?? recipes.length} {pageTitle.toLowerCase()} on Spoonbowl
          — each with full ingredients lists, step-by-step instructions, prep and cook times,
          serving sizes, and calorie counts.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Related recipe names">
          {recipes.slice(0, 6).map((r) => (
            <Link
              key={r.id}
              to="/recipe/$recipeId/$slug"
              params={{ recipeId: String(r.id), slug: r.name.toLowerCase().replace(/\s+/g, "-") }}
              className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </section>
    )}

    {allCuisines && allCuisines.length > 1 && (
      <section className="mt-8" aria-labelledby="other-cuisines-heading">
        <h2
          id="other-cuisines-heading"
          className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3"
        >
          Other Cuisines
        </h2>
        <div className="flex flex-wrap gap-2">
          {allCuisines
            .filter((c) => c !== cuisine)
            .map((c) => (
              <Link
                key={c}
                to="/recipes/cuisine/$cuisine"
                params={{ cuisine: cuisineToSlug(c) }}
                onMouseEnter={() => prefetchCuisine(c)}
                onFocus={() => prefetchCuisine(c)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span aria-hidden="true">{getCuisineEmoji(c)}</span>
                {c}
              </Link>
            ))}
        </div>
      </section>
    )}

    <div className="mt-8 flex justify-start">
      <Button asChild variant="outline" className="gap-2">
        <Link
          to="/recipes/cuisines"
          onMouseEnter={prefetchCuisinesIndex}
          onFocus={prefetchCuisinesIndex}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All Cuisines
        </Link>
      </Button>
    </div>
  </>
)
