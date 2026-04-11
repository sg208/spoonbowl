import { useRef, useState, useCallback, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import type { Recipe } from "@/lib/api"
import { useRecipeSearch } from "@/hooks/useRecipeSearch"
import { cn, slugify } from "@/lib/utils"

const renderBoldHighlight = (text: string, query: string): JSX.Element => {
  if (!query) return <>{text}</>

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) return <>{text}</>

  const before = text.substring(0, index)
  const match = text.substring(index, index + query.length)
  const after = text.substring(index + query.length)

  return (
    <>
      {before}
      <strong>{match}</strong>
      {after}
    </>
  )
}

interface RecipeSearchProps {
  recipes: Recipe[] | undefined
  isLoading?: boolean
}

export const RecipeSearch = ({ recipes, isLoading = false }: RecipeSearchProps): JSX.Element => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const results = useRecipeSearch(recipes, query)
  const showResults = query.length >= 3 && results.length > 0

  const handleSelectRecipe = useCallback(
    (recipe: Recipe) => {
      setQuery("")
      setSelectedIndex(-1)
      const slug = slugify(recipe.name)
      navigate({
        to: "/recipe/$recipeId/$slug",
        params: { recipeId: recipe.id.toString(), slug },
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
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectRecipe(results[selectedIndex])
        }
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
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setQuery("")
      setSelectedIndex(-1)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  // Clamp selected index when results change to prevent out-of-bounds
  const clampedIndex = selectedIndex >= results.length ? -1 : selectedIndex

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-8">
      <div>
        <label htmlFor="recipe-search" className="mb-2 block text-sm font-medium text-gray-200">
          Search recipes
        </label>
        <input
          ref={inputRef}
          id="recipe-search"
          type="text"
          placeholder="Type at least 3 characters…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-autocomplete="list"
          aria-controls="recipe-search-results"
          aria-label="Search recipes by name, cuisine, tags, or ingredients"
          className={cn(
            "w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5",
            "text-white placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors"
          )}
        />
      </div>

      {showResults && (
        <ul
          ref={dropdownRef}
          id="recipe-search-results"
          role="listbox"
          aria-label={`${results.length} recipe result${results.length !== 1 ? "s" : ""} found`}
          className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-600 bg-gray-800 shadow-lg"
        >
          {results.map((recipe, index) => (
            <li
              key={recipe.id}
              role="option"
              aria-selected={index === clampedIndex}
              className={cn(
                "cursor-pointer border-b border-gray-700 px-4 py-3 text-sm transition-colors",
                "last:border-b-0",
                index === clampedIndex
                  ? "bg-orange-500/20 text-orange-100"
                  : "text-gray-200 hover:bg-gray-700"
              )}
              onClick={() => handleSelectRecipe(recipe)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  handleSelectRecipe(recipe)
                }
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {renderBoldHighlight(recipe.name, query)} •{" "}
                  <span className="text-gray-400">{recipe.cuisine}</span>
                </div>
                <span className="ml-2 flex-shrink-0 rounded bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-300">
                  {recipe.difficulty}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 3 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-center text-sm text-gray-400 shadow-lg">
          No recipes found matching "{query}"
        </div>
      )}
    </div>
  )
}
