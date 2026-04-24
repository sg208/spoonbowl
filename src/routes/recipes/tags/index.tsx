import { createFileRoute, Link } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Tag, ChefHat, ArrowRight } from "lucide-react"
import { fetchRecipesByTag } from "@/lib/api"
import { useTags } from "@/hooks/useRecipeQueries"
import {
  tagToPageTitle,
  sortTagsAlphabetically,
  getTagEmoji,
  tagToSlug,
} from "@/lib/utils/tagUtils"
import { recipeKeys } from "@/lib/keys/recipeKeys"
import { STALE_TIME_5M_MS } from "@/lib/queryClient"
import { formatPageTitle } from "@/lib/seo"
import { Badge } from "@/components/ui/badge"

export const Route = createFileRoute("/recipes/tags/")({
  component: TagsIndexPage,
})

const TagsIndexPage = () => {
  const queryClient = useQueryClient()
  const { data: tags, isLoading, isError } = useTags()

  const prefetchTag = useCallback(
    (tag: string) => {
      queryClient.prefetchQuery({
        queryKey: recipeKeys.byTag(tag),
        queryFn: () => fetchRecipesByTag(tag),
        staleTime: STALE_TIME_5M_MS,
      })
    },
    [queryClient]
  )

  const grouped = tags ? sortTagsAlphabetically(tags) : {}
  const letters = Object.keys(grouped).sort()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Helmet title={formatPageTitle("Recipes by Category")}>
        <meta
          name="description"
          content="Explore recipes by category on Spoonbowl — find dishes by ingredient, cooking style, occasion, and more."
        />
      </Helmet>
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary border-0 font-medium">
            <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
            Browse Categories
          </Badge>
        </div>
        <h1
          id="tags-page-heading"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
        >
          Recipes by Category
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          Explore every cuisine, ingredient, and cooking style. Find exactly what you're craving —
          from quick weeknight stir-fries to weekend Italian feasts.
        </p>
        {!isLoading && tags && (
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {tags.length} categories to explore
          </p>
        )}
      </header>

      {isError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive"
        >
          Failed to load categories. Please refresh the page.
        </div>
      )}

      {isLoading && <TagsGridSkeleton />}

      {!isLoading && !isError && tags && (
        <div className="space-y-10">
          {letters.map((letter) => (
            <section key={letter} aria-labelledby={`letter-${letter}`}>
              <div className="flex items-center gap-3 mb-4">
                <h2
                  id={`letter-${letter}`}
                  className="text-xs font-bold tracking-widest uppercase text-muted-foreground"
                >
                  {letter}
                </h2>
                <div className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>

              <ul
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                role="list"
                aria-label={`Categories starting with ${letter}`}
              >
                {grouped[letter].map((tag) => (
                  <li key={tag}>
                    <Link
                      to="/recipes/tag/$tag"
                      params={{ tag: tagToSlug(tag) }}
                      onMouseEnter={() => prefetchTag(tag)}
                      onFocus={() => prefetchTag(tag)}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Browse ${tagToPageTitle(tag)}`}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xl"
                        aria-hidden="true"
                      >
                        {getTagEmoji(tag)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors truncate">
                          {tagToPageTitle(tag)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{tag}</p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {!isLoading && !isError && !tags?.length && (
        <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
          <ChefHat className="h-14 w-14 text-muted-foreground mb-4" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">No categories found</h2>
          <p className="text-muted-foreground mt-1 text-sm">Try refreshing the page.</p>
        </div>
      )}

      <section
        className="mt-16 rounded-2xl bg-secondary/60 border border-border p-8 text-center"
        aria-labelledby="seo-section-heading"
      >
        <h2 id="seo-section-heading" className="text-xl font-bold tracking-tight text-foreground">
          All Recipe Categories on Spoonbowl
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          Browse our complete collection organized by cuisine, ingredient, and cooking method.
          Perfect for finding inspiration for every meal of the day.
        </p>
        {tags && (
          <div
            className="mt-5 flex flex-wrap justify-center gap-2"
            aria-label="All recipe category tags"
          >
            {tags.map((tag) => (
              <Link
                key={tag}
                to="/recipes/tag/$tag"
                params={{ tag: tagToSlug(tag) }}
                onMouseEnter={() => prefetchTag(tag)}
                onFocus={() => prefetchTag(tag)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={tagToPageTitle(tag)}
              >
                <span aria-hidden="true">{getTagEmoji(tag)}</span>
                {tagToPageTitle(tag)}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const TagsGridSkeleton = () => {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="Loading categories">
      {Array.from({ length: 3 }).map((_, gi) => (
        <div key={gi} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-4 bg-muted rounded animate-pulse" />
            <div className="flex-1 h-px bg-border" />
          </div>
          <ul
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="h-10 w-10 rounded-lg bg-muted animate-pulse shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
