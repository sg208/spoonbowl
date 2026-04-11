import { useRef, useState, useCallback, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import type { Recipe } from "@/lib/api"
import { useRecipeSearch } from "@/hooks/useRecipeSearch"
import { searchPlaceholders } from "@/lib/headings"
import { cn, slugify } from "@/lib/utils"
import { recipeKeys } from "@/lib/keys/recipeKeys"

const PLACEHOLDER_INTERVAL_MS = 3200

const renderBoldHighlight = (text: string, query: string): JSX.Element => {
  const lowerText = text.toLowerCase()
  const index = lowerText.indexOf(query.toLowerCase())
  if (index === -1) return <>{text}</>
  return (
    <>
      {text.substring(0, index)}
      <strong>{text.substring(index, index + query.length)}</strong>
      {text.substring(index + query.length)}
    </>
  )
}

interface RecipeSearchProps {
  recipes: Recipe[] | undefined
  heading: string
  isLoading?: boolean
}

export const RecipeSearch = ({
  recipes,
  heading,
  isLoading = false,
}: RecipeSearchProps): JSX.Element => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const results = useRecipeSearch(recipes, query)
  const showResults = query.length >= 3 && results.length > 0
  const clampedIndex = selectedIndex >= results.length ? -1 : selectedIndex
  const activeDescendantId =
    clampedIndex >= 0 ? `recipe-option-${results[clampedIndex]?.id}` : undefined

  // Cycle through placeholder hints when the user isn't typing
  useEffect(() => {
    if (query.length > 0) return
    const id = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length)
    }, PLACEHOLDER_INTERVAL_MS)
    return () => clearInterval(id)
  }, [query])

  const handlePrefetchRecipe = useCallback(
    (recipe: Recipe) => {
      queryClient.setQueryData(recipeKeys.detail(recipe.id), recipe)
    },
    [queryClient]
  )

  const handleSelectRecipe = useCallback(
    (recipe: Recipe) => {
      setQuery("")
      setSelectedIndex(-1)
      navigate({
        to: "/recipe/$recipeId/$slug",
        params: { recipeId: recipe.id.toString(), slug: slugify(recipe.name) },
      })
    },
    [navigate]
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults) return
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        event.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case "Enter":
        event.preventDefault()
        if (clampedIndex >= 0 && results[clampedIndex]) handleSelectRecipe(results[clampedIndex])
        break
      case "Escape":
        event.preventDefault()
        setQuery("")
        setSelectedIndex(-1)
        inputRef.current?.focus()
        break
      default:
        break
    }
  }

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      !dropdownRef.current?.contains(event.target as Node) &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      setQuery("")
      setSelectedIndex(-1)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

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
        <ul
          ref={dropdownRef}
          id="recipe-search-results"
          role="listbox"
          aria-label={`${results.length} recipe result${results.length !== 1 ? "s" : ""} found`}
          hidden={!showResults}
          className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-96 overflow-y-auto rounded-xl border border-border bg-card shadow-xl"
        >
          {results.map((recipe, index) => (
            <li
              key={recipe.id}
              id={`recipe-option-${recipe.id}`}
              role="option"
              aria-selected={index === clampedIndex}
              className={cn(
                "cursor-pointer border-b border-border/50 px-5 py-3 text-sm transition-colors last:border-b-0",
                index === clampedIndex
                  ? "bg-orange-500/15 text-orange-100"
                  : "text-foreground hover:bg-muted"
              )}
              onClick={() => handleSelectRecipe(recipe)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  handleSelectRecipe(recipe)
                }
              }}
              onMouseEnter={() => {
                setSelectedIndex(index)
                handlePrefetchRecipe(recipe)
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex-1 min-w-0 truncate">
                  {renderBoldHighlight(recipe.name, query)}
                  <span className="text-muted-foreground"> · {recipe.cuisine}</span>
                </span>
                <span
                  className={cn(
                    "flex-shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
                    recipe.difficulty === "Easy" && "bg-green-900/40 text-green-300",
                    recipe.difficulty === "Medium" && "bg-yellow-900/40 text-yellow-300",
                    recipe.difficulty === "Hard" && "bg-red-900/40 text-red-300"
                  )}
                >
                  {recipe.difficulty}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {query.length >= 3 && results.length === 0 && (
          <div
            role="status"
            className="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border border-border bg-card px-5 py-4 text-center text-sm text-muted-foreground shadow-xl"
          >
            No recipes found matching &ldquo;{query}&rdquo;
          </div>
        )}

        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {showResults
            ? `${results.length} result${results.length !== 1 ? "s" : ""} available`
            : query.length >= 3
              ? "No results found"
              : ""}
        </div>
      </div>
    </section>
  )
}
