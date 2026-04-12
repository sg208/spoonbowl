import { useRef, useState, useCallback, useEffect } from "react"
import type React from "react"
import type { Recipe } from "@/lib/api"
import { useRecipeSearch, MIN_QUERY_LENGTH } from "@/hooks/useRecipeSearch"
import { searchPlaceholders } from "@/lib/config/headings"

const PLACEHOLDER_INTERVAL_MS = 3200

interface RecipeComboboxState {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  results: Recipe[]
  showResults: boolean
  clampedIndex: number
  activeDescendantId: string | undefined
  placeholderIndex: number
  inputRef: React.RefObject<HTMLInputElement>
  dropdownRef: React.RefObject<HTMLUListElement>
  handleSelect: (recipe: Recipe) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const useRecipeCombobox = (
  recipes: Recipe[] | undefined,
  onNavigate: (recipe: Recipe) => void
): RecipeComboboxState => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const results = useRecipeSearch(recipes, query)
  const showResults = query.length >= MIN_QUERY_LENGTH && results.length > 0
  const clampedIndex = selectedIndex >= results.length ? -1 : selectedIndex
  const activeDescendantId =
    clampedIndex >= 0 ? `recipe-option-${results[clampedIndex]?.id}` : undefined

  useEffect(() => {
    if (query.length > 0) return
    const id = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length)
    }, PLACEHOLDER_INTERVAL_MS)
    return () => clearInterval(id)
  }, [query])

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

  const handleSelect = useCallback(
    (recipe: Recipe) => {
      setQuery("")
      setSelectedIndex(-1)
      onNavigate(recipe)
    },
    [onNavigate]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
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
          if (clampedIndex >= 0 && results[clampedIndex]) handleSelect(results[clampedIndex])
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
    },
    [showResults, results, clampedIndex, handleSelect]
  )

  return {
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
  }
}
