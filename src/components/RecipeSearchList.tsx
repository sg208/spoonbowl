import type React from "react"
import type { Recipe } from "@/lib/api"
import { cn } from "@/lib/utils"

const difficultyClassMap = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
} as const

const highlightMatch = (text: string, query: string): React.JSX.Element => {
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

interface RecipeSearchListProps {
  results: Recipe[]
  clampedIndex: number
  query: string
  showResults: boolean
  dropdownRef: React.RefObject<HTMLUListElement>
  onSelect: (recipe: Recipe) => void
  onHoverIndex: (index: number) => void
  onPrefetch: (recipe: Recipe) => void
}

export const RecipeSearchList = ({
  results,
  clampedIndex,
  query,
  showResults,
  dropdownRef,
  onSelect,
  onHoverIndex,
  onPrefetch,
}: RecipeSearchListProps): React.JSX.Element => (
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
        tabIndex={-1}
        className={cn(
          "cursor-pointer border-b border-border/50 px-5 py-3 text-sm transition-colors last:border-b-0",
          index === clampedIndex
            ? "bg-primary/10 text-foreground"
            : "text-foreground hover:bg-muted"
        )}
        onClick={() => onSelect(recipe)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onSelect(recipe)
          }
        }}
        onMouseEnter={() => {
          onHoverIndex(index)
          onPrefetch(recipe)
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex-1 min-w-0 truncate">
            {highlightMatch(recipe.name, query)}
            <span className="text-muted-foreground"> · {recipe.cuisine}</span>
          </span>
          <span
            className={cn(
              "flex-shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
              difficultyClassMap[recipe.difficulty as keyof typeof difficultyClassMap]
            )}
          >
            {recipe.difficulty}
          </span>
        </div>
      </li>
    ))}
  </ul>
)
