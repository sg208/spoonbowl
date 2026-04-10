import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { RecipeCard, RecipeCardSkeleton, EmptyRecipes } from "@/components/RecipeCard"
import { fetchAllRecipes } from "@/lib/api"

const NotFoundRandomRecipe = () => {
  const [sessionId] = useState(() => crypto.randomUUID())

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["not-found", "random-recipe", sessionId],
    queryFn: async () => {
      const res = await fetchAllRecipes()
      if (res.recipes.length === 0) return null
      const index = Math.floor(Math.random() * res.recipes.length)
      return res.recipes[index] ?? null
    },
  })

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-sm grid-cols-1">
        <RecipeCardSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-6 text-center text-sm text-destructive" role="alert">
        Failed to load a recipe. Please try again.
      </div>
    )
  }

  if (!recipe) {
    return <EmptyRecipes />
  }

  return (
    <div className="mx-auto grid max-w-sm grid-cols-1">
      <RecipeCard recipe={recipe} />
    </div>
  )
}

export default NotFoundRandomRecipe
