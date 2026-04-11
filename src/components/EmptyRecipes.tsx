import { ChefHat } from "lucide-react"

export const EmptyRecipes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
      <ChefHat className="h-16 w-16 text-muted-foreground mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-foreground">No recipes found</h3>
      <p className="text-muted-foreground mt-1 text-sm">Try again in a moment.</p>
    </div>
  )
}
