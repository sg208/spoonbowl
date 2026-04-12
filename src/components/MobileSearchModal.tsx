import type React from "react"
import { useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import type { Recipe } from "@/lib/api"
import { useAllRecipes } from "@/hooks/useRecipeQueries"
import { useRecipeCombobox } from "@/hooks/useRecipeCombobox"
import { MobileSearchModalBody } from "@/components/MobileSearchModalBody"
import { recipeDetailKeys } from "@/lib/keys/recipeKeys"
import { slugify } from "@/lib/utils"
import { Dialog } from "@/components/ui/dialog"

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
      <MobileSearchModalBody
        inputRef={inputRef}
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        isPending={isPending}
        results={results}
        showResults={showResults}
        clampedIndex={clampedIndex}
        activeDescendantId={activeDescendantId}
        placeholderIndex={placeholderIndex}
        dropdownRef={dropdownRef}
        handleSelect={handleSelect}
        setSelectedIndex={setSelectedIndex}
        handlePrefetch={handlePrefetch}
        onClose={onClose}
      />
    </Dialog>
  )
}
