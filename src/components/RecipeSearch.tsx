import type React from "react"
import { useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import type { Recipe } from "@/lib/api"
import { useRecipeCombobox } from "@/hooks/useRecipeCombobox"
import { RecipeSearchList } from "@/components/RecipeSearchList"
import { searchPlaceholders } from "@/lib/headings"
import { cn, slugify } from "@/lib/utils"
import { recipeDetailKeys } from "@/lib/keys/recipeKeys"

interface RecipeSearchProps {
  recipes: Recipe[] | undefined
  heading: string
  isLoading?: boolean
}

export const RecipeSearch = ({
  recipes,
  heading,
  isLoading = false,
}: RecipeSearchProps): React.JSX.Element => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleNavigate = useCallback(
    (recipe: Recipe) => {
      navigate({
        to: "/recipe/$recipeId/$slug",
        params: { recipeId: recipe.id.toString(), slug: slugify(recipe.name) },
      })
    },
    [navigate]
  )

  const handlePrefetchRecipe = useCallback(
    (recipe: Recipe) => {
      queryClient.setQueryData(recipeDetailKeys.detail(recipe.id), recipe)
    },
    [queryClient]
  )

  const {
    query,
    setQuery,
    setSelectedIndex,
    results,
    showResults,
    clampedIndex,
    activeDescendantId,
    placeholderIndex,
    inputRef,
    dropdownRef,
    handleSelect,
    handleKeyDown,
  } = useRecipeCombobox(recipes, handleNavigate)

  return (
    <section aria-labelledby="search-section-label" className="mb-12">
      <div className="mb-4 text-center">
        <h2
          id="search-section-label"
          className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          {heading}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Search by name, ingredient, cuisine, or tag. Results appear as you type.
        </p>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          id="recipe-search"
          type="text"
          role="combobox"
          placeholder={searchPlaceholders[placeholderIndex]}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-autocomplete="list"
          aria-expanded={showResults}
          aria-controls="recipe-search-results"
          aria-activedescendant={activeDescendantId}
          aria-label="Search recipes by name, cuisine, tags, or ingredients"
          className={cn(
            "w-full rounded-xl border border-border bg-card px-5 py-4 text-base text-foreground",
            "placeholder:text-muted-foreground/60 placeholder:transition-none",
            "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          )}
        />

        {/* Always in DOM so aria-controls always resolves; hidden hides it from AT when inactive */}
        <RecipeSearchList
          results={results}
          clampedIndex={clampedIndex}
          query={query}
          showResults={showResults}
          dropdownRef={dropdownRef}
          onSelect={handleSelect}
          onHoverIndex={setSelectedIndex}
          onPrefetch={handlePrefetchRecipe}
        />

        {query.trim().length >= 3 && results.length === 0 && !isLoading && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border border-border bg-card px-5 py-4 text-center text-sm text-muted-foreground shadow-xl">
            No recipes found matching &ldquo;{query}&rdquo;
          </div>
        )}

        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {showResults
            ? `${results.length} result${results.length !== 1 ? "s" : ""} available`
            : query.trim().length >= 3 && !isLoading
              ? `No results found for ${query}`
              : ""}
        </div>
      </div>
    </section>
  )
}
