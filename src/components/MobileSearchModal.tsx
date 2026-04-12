import type React from "react"
import { useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { X } from "lucide-react"
import type { Recipe } from "@/lib/api"
import { useAllRecipes } from "@/hooks/useRecipeQueries"
import { useRecipeCombobox } from "@/hooks/useRecipeCombobox"
import { RecipeSearchList } from "@/components/RecipeSearchList"
import { recipeDetailKeys } from "@/lib/keys/recipeKeys"
import { searchPlaceholders } from "@/lib/config/headings"
import { slugify, cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MIN_QUERY_LENGTH } from "@/hooks/useRecipeSearch"

interface MobileSearchModalProps {
  open: boolean
  onClose: () => void
}

export const MobileSearchModal = ({ open, onClose }: MobileSearchModalProps): React.JSX.Element => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data, isPending } = useAllRecipes()
  const recipes = data?.recipes

  const handleNavigate = useCallback(
    (recipe: Recipe) => {
      onClose()
      navigate({
        to: "/recipe/$recipeId/$slug",
        params: { recipeId: recipe.id.toString(), slug: slugify(recipe.name) },
      })
    },
    [onClose, navigate]
  )

  const handlePrefetch = useCallback(
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
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 translate-x-0 translate-y-0 max-w-none h-svh rounded-none p-0 flex flex-col gap-0"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          inputRef.current?.focus()
        }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 shrink-0">
          <DialogTitle className="flex-1 text-base font-semibold">Search recipes</DialogTitle>
          <Button variant="ghost" size="icon" aria-label="Close search" onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="p-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              placeholder={searchPlaceholders[placeholderIndex]}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isPending}
              aria-autocomplete="list"
              aria-expanded={showResults}
              aria-controls="recipe-search-results"
              aria-activedescendant={activeDescendantId}
              aria-label="Search recipes by name, cuisine, tags, or ingredients"
              className={cn(
                "w-full rounded-xl border border-border bg-card px-5 py-4 text-base text-foreground",
                "placeholder:text-muted-foreground/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
                "disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              )}
            />

            <RecipeSearchList
              results={results}
              clampedIndex={clampedIndex}
              query={query}
              showResults={showResults}
              dropdownRef={dropdownRef}
              onSelect={handleSelect}
              onHoverIndex={setSelectedIndex}
              onPrefetch={handlePrefetch}
            />

            {query.trim().length >= MIN_QUERY_LENGTH && results.length === 0 && !isPending && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border border-border bg-card px-5 py-4 text-center text-sm text-muted-foreground shadow-xl">
                No recipes found matching &ldquo;{query}&rdquo;
              </div>
            )}

            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {showResults
                ? `${results.length} result${results.length !== 1 ? "s" : ""} available`
                : query.trim().length >= MIN_QUERY_LENGTH && !isPending
                  ? `No results found for ${query}`
                  : ""}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
