import { Link } from "@tanstack/react-router"
import { Clock, Star, Users, ArrowRight, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/api"
import { slugify } from "@/lib/utils"

interface FeaturedRecipeProps {
  recipe: Recipe
}

export const FeaturedRecipe = ({ recipe }: FeaturedRecipeProps) => {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <section
      aria-labelledby="featured-recipe-heading"
      className="relative overflow-hidden rounded-2xl bg-card border border-border"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[16/9]">
          <img
            src={recipe.image}
            alt={`Featured recipe: ${recipe.name}`}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r"
            aria-hidden="true"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground font-semibold gap-1">
              <Flame className="h-3 w-3" aria-hidden="true" />
              Featured Today
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 lg:gap-3 lg:p-6 xl:p-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {recipe.cuisine}
            </Badge>
            {recipe.mealType.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>

          <div>
            <h2
              id="featured-recipe-heading"
              className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl"
            >
              {recipe.name}
            </h2>
            {recipe.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Recipe tags">
                {recipe.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Total Time
              </dt>
              <dd className="text-sm font-semibold text-foreground">{totalTime} min</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Servings
              </dt>
              <dd className="text-sm font-semibold text-foreground">{recipe.servings}</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <Star
                  className="h-3.5 w-3.5 fill-spoon-amber text-spoon-amber"
                  aria-hidden="true"
                />
                Rating
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {recipe.rating.toFixed(1)}{" "}
                <span className="font-normal text-muted-foreground text-xs">
                  ({recipe.reviewCount})
                </span>
              </dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted-foreground">Difficulty</dt>
              <dd className="text-sm font-semibold text-foreground">{recipe.difficulty}</dd>
            </div>
          </dl>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Link
                to="/recipe/$recipeId/$slug"
                params={{ recipeId: String(recipe.id), slug: slugify(recipe.name) }}
                aria-label={`View full recipe for ${recipe.name}`}
              >
                View Recipe
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              {recipe.caloriesPerServing} cal / serving
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export const FeaturedRecipeSkeleton = () => {
  return (
    <div
      className="rounded-2xl border border-border overflow-hidden bg-card"
      aria-busy="true"
      aria-label="Loading featured recipe"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="aspect-[16/9] bg-muted animate-pulse" />
        <div className="flex flex-col justify-center space-y-4 p-6 lg:p-6 xl:p-8">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
            <div className="h-5 w-12 bg-muted rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-7 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-7 w-1/2 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                <div className="h-4 w-8 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
