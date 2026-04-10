import { Link } from "@tanstack/react-router"
import { Clock, Star, Users, ChefHat } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Recipe } from "@/lib/api"
import { slugify } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
}

const difficultyColors = {
  Easy: "bg-accent text-accent-foreground",
  Medium: "bg-secondary text-secondary-foreground",
  Hard: "bg-destructive/10 text-destructive",
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <Link
      to="/recipe/$recipeId/$slug"
      params={{ recipeId: String(recipe.id), slug: slugify(recipe.name) }}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      aria-label={`View recipe: ${recipe.name}, ${recipe.cuisine} cuisine, ${recipe.difficulty} difficulty, ${totalTime} minutes total`}
    >
      <Card className="overflow-hidden h-full border-border transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-2 right-2">
            <Badge
              className={`text-xs font-medium ${difficultyColors[recipe.difficulty] ?? "bg-muted text-muted-foreground"}`}
              aria-label={`Difficulty: ${recipe.difficulty}`}
            >
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-1">
            <Badge variant="outline" className="text-xs text-muted-foreground border-border">
              {recipe.cuisine}
            </Badge>
          </div>

          <h3 className="font-semibold text-base leading-snug text-card-foreground mt-1.5 line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.name}
          </h3>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1" aria-label={`Total time: ${totalTime} minutes`}>
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1" aria-label={`Serves ${recipe.servings} people`}>
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1" aria-label={`Rating: ${recipe.rating} out of 5`}>
              <Star className="h-3.5 w-3.5 fill-spoon-amber text-spoon-amber" aria-hidden="true" />
              <span>{recipe.rating.toFixed(1)}</span>
            </div>
          </div>

          {recipe.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1" aria-label="Recipe tags">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export const RecipeCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full border-border" aria-hidden="true">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-14 bg-muted rounded animate-pulse" />
          <div className="h-3 w-10 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

export const EmptyRecipes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
      <ChefHat className="h-16 w-16 text-muted-foreground mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-foreground">No recipes found</h3>
      <p className="text-muted-foreground mt-1 text-sm">Try again in a moment.</p>
    </div>
  )
}
