import { createFileRoute, Link } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, BarChart2, ChefHat } from "lucide-react"
import { fetchRecipesByDifficulty } from "@/lib/api"
import { useDifficulties, useRecipesByDifficulty } from "@/hooks/useRecipeQueries"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"
import {
  getDifficultyEmoji,
  getDifficultyDescription,
  difficultyToPageTitle,
  difficultyToSlug,
  slugToDifficulty,
} from "@/lib/utils/difficultyUtils"
import { RecipeCard } from "@/components/RecipeCard"
import { RecipeCardSkeleton } from "@/components/RecipeCardSkeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPageTitle, getBrowserCanonicalUrl } from "@/lib/seo"
import { slugify } from "@/lib/utils"

export const Route = createFileRoute("/recipes/difficulty/$difficulty")({
  component: DifficultyRecipesPage,
})

const DifficultyRecipesPage = () => {
  const { difficulty: difficultySlug } = Route.useParams()
  const queryClient = useQueryClient()

  const { data: allDifficulties } = useDifficulties()

  const difficulty = slugToDifficulty(difficultySlug, allDifficulties)
  const pageTitle = difficultyToPageTitle(difficulty)
  const helmetTitle = pageTitle.replace(/ Recipes$/, "")
  const description = getDifficultyDescription(difficulty)
  const emoji = getDifficultyEmoji(difficulty)
  const canonicalUrl = getBrowserCanonicalUrl()

  const { data, isLoading, isError } = useRecipesByDifficulty(difficulty, Boolean(allDifficulties))

  const recipes = data?.recipes ?? []

  const prefetchDifficulty = (d: string) => {
    queryClient.prefetchQuery({
      queryKey: recipeKeys.byDifficulty(d),
      queryFn: () => fetchRecipesByDifficulty(d),
      staleTime: STALE_TIME_5M_MS,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Helmet title={formatPageTitle(helmetTitle)}>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={`${pageTitle} | Spoonbowl`} />
        <meta property="og:description" content={description} />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      </Helmet>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <li>
            <Link
              to="/"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to="/recipes/difficulties/"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Recipes by Difficulty
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium" aria-current="page">
            {pageTitle}
          </li>
        </ol>
      </nav>

      <header className="mb-10" aria-labelledby="difficulty-page-heading">
        <div className="flex items-start gap-4">
          <span
            className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl sm:text-4xl border border-border"
            aria-hidden="true"
          >
            {emoji}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-medium gap-1">
                <BarChart2 className="h-3 w-3" aria-hidden="true" />
                {difficulty}
              </Badge>
              {!isLoading && data && (
                <Badge variant="outline" className="text-xs">
                  {data.total} {data.total === 1 ? "recipe" : "recipes"}
                </Badge>
              )}
            </div>
            <h1
              id="difficulty-page-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance"
            >
              {pageTitle}
            </h1>
            <p className="mt-2 text-muted-foreground leading-7 max-w-2xl">{description}</p>
          </div>
        </div>
      </header>

      {isError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center"
        >
          <ChefHat className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
          <p className="text-destructive font-medium">Failed to load recipes for "{difficulty}"</p>
          <p className="text-sm text-muted-foreground mt-1">Please try again.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/recipes/difficulties/">Back to Difficulty Levels</Link>
          </Button>
        </div>
      )}

      {!isError && (
        <>
          <ul
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label={`${pageTitle} recipe grid`}
          >
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <RecipeCardSkeleton key={i} />)
              : recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                  </li>
                ))}
          </ul>

          {!isLoading && recipes.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              role="status"
            >
              <ChefHat className="h-14 w-14 text-muted-foreground mb-4" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-foreground">
                No recipes found for "{difficulty}"
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Try exploring other difficulty levels.
              </p>
              <Button asChild variant="outline" className="mt-5 gap-2">
                <Link to="/recipes/difficulties/">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Browse Difficulty Levels
                </Link>
              </Button>
            </div>
          )}
        </>
      )}

      {!isLoading && !isError && recipes.length > 0 && (
        <section
          className="mt-12 rounded-2xl bg-secondary/50 border border-border p-6"
          aria-labelledby="difficulty-seo-heading"
        >
          <h2 id="difficulty-seo-heading" className="text-base font-semibold text-foreground mb-2">
            About {pageTitle}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description} Browse all {data?.total} {pageTitle.toLowerCase()} on Spoonbowl — each
            with full ingredients lists, step-by-step instructions, prep and cook times, serving
            sizes, and calorie counts.
          </p>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Related recipe names">
            {recipes.slice(0, 6).map((r) => (
              <Link
                key={r.id}
                to="/recipe/$recipeId/$slug"
                params={{ recipeId: String(r.id), slug: slugify(r.name) }}
                className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {allDifficulties && allDifficulties.length > 1 && (
        <section className="mt-8" aria-labelledby="other-difficulties-heading">
          <h2
            id="other-difficulties-heading"
            className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3"
          >
            Other Difficulty Levels
          </h2>
          <div className="flex flex-wrap gap-2">
            {allDifficulties
              .filter((d) => d !== difficulty)
              .map((d) => (
                <Link
                  key={d}
                  to="/recipes/difficulty/$difficulty"
                  params={{ difficulty: difficultyToSlug(d) }}
                  onMouseEnter={() => prefetchDifficulty(d)}
                  onFocus={() => prefetchDifficulty(d)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span aria-hidden="true">{getDifficultyEmoji(d)}</span>
                  {d}
                </Link>
              ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex justify-start">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/recipes/difficulties/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Difficulty Levels
          </Link>
        </Button>
      </div>
    </div>
  )
}
