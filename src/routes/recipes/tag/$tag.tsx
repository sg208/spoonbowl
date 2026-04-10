import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ChefHat, Tag } from "lucide-react"
import { fetchRecipesByTag, fetchTags } from "@/lib/api"
import { tagToPageTitle, tagToDescription, slugToTag, getTagEmoji } from "@/lib/tagUtils"
import { RecipeCard, RecipeCardSkeleton } from "@/components/RecipeCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/recipes/tag/$tag")({
  component: TagRecipesPage,
})

const TagRecipesPage = () => {
  const { tag: tagSlug } = Route.useParams()

  const { data: allTags } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  })

  const tag = slugToTag(tagSlug, allTags)
  const pageTitle = tagToPageTitle(tag)
  const description = tagToDescription(tag)
  const emoji = getTagEmoji(tag)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes", "tag", tag],
    queryFn: () => fetchRecipesByTag(tag),
    enabled: Boolean(tag),
  })

  const recipes = data?.recipes ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap" role="list">
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
              to="/recipes/tags/"
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Recipes by Category
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium" aria-current="page">
            {pageTitle}
          </li>
        </ol>
      </nav>

      <header className="mb-10" aria-labelledby="tag-page-heading">
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
                <Tag className="h-3 w-3" aria-hidden="true" />
                {tag}
              </Badge>
              {!isLoading && data && (
                <Badge variant="outline" className="text-xs">
                  {data.total} {data.total === 1 ? "recipe" : "recipes"}
                </Badge>
              )}
            </div>
            <h1
              id="tag-page-heading"
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
          <p className="text-destructive font-medium">Failed to load recipes for "{tag}"</p>
          <p className="text-sm text-muted-foreground mt-1">Please try again.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/recipes/tags/">Back to Categories</Link>
          </Button>
        </div>
      )}

      {!isError && (
        <>
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label={`${pageTitle} recipe grid`}
          >
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <RecipeCardSkeleton key={i} />)
              : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>

          {!isLoading && recipes.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              role="status"
            >
              <ChefHat className="h-14 w-14 text-muted-foreground mb-4" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-foreground">
                No recipes found for "{tag}"
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">Try exploring other categories.</p>
              <Button asChild variant="outline" className="mt-5 gap-2">
                <Link to="/recipes/tags/">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Browse Categories
                </Link>
              </Button>
            </div>
          )}
        </>
      )}

      {!isLoading && !isError && recipes.length > 0 && (
        <section
          className="mt-12 rounded-2xl bg-secondary/50 border border-border p-6"
          aria-labelledby="seo-meta-heading"
        >
          <h2 id="seo-meta-heading" className="text-base font-semibold text-foreground mb-2">
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
                to="/recipes/$recipeId"
                params={{ recipeId: String(r.id) }}
                className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex justify-start">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/recipes/tags/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Categories
          </Link>
        </Button>
      </div>
    </div>
  )
}
