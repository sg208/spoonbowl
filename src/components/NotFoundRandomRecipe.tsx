import { Fragment, useMemo } from "react"
import { RecipeCard } from "@/components/RecipeCard"
import { RecipeCardSkeleton } from "@/components/RecipeCardSkeleton"
import { EmptyRecipes } from "@/components/EmptyRecipes"
import { useNotFoundRandomRecipe } from "@/hooks/useRecipeQueries"

const NotFoundRandomRecipe = () => {
  const clientSessionId = useMemo(() => crypto.randomUUID(), [])

  const { data: recipe, isLoading, isError } = useNotFoundRandomRecipe()

  if (isLoading) {
    return (
      <div key={clientSessionId} className="mx-auto grid max-w-sm grid-cols-1">
        <RecipeCardSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div key={clientSessionId} className="py-6 text-center text-sm text-destructive" role="alert">
        Failed to load a recipe. Please try again.
      </div>
    )
  }

  if (!recipe) {
    return (
      <Fragment key={clientSessionId}>
        <EmptyRecipes />
      </Fragment>
    )
  }

  return (
    <div key={clientSessionId} className="mx-auto grid max-w-sm grid-cols-1">
      <RecipeCard recipe={recipe} />
    </div>
  )
}

export default NotFoundRandomRecipe
