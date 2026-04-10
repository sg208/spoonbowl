import { createFileRoute, Link } from "@tanstack/react-router"
import { Clock, ChefHat, Users, Star, Flame, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRecipeDetail } from "@/hooks/use-recipe-queries"
import { fetchRecipe } from "@/lib/api"
import { recipeDetailKeys } from "@/lib/keys/recipeKeys"

const RecipeDetailPage = () => {
  const { recipeId } = Route.useParams()
  const id = Number(recipeId)

  const { data: recipe, isLoading, isError } = useRecipeDetail(id)

  if (isLoading) {
    return <RecipeDetailSkeleton />
  }

  if (isError || !recipe) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center" role="alert">
        <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-foreground">Recipe not found</h1>
        <p className="text-muted-foreground mt-2">This recipe doesn't seem to exist.</p>
        <Button asChild className="mt-6">
          <Link to="/">Back to Recipes</Link>
        </Button>
      </div>
    )
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <article
      className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      aria-labelledby="recipe-title"
    >
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Recipes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium truncate max-w-xs" aria-current="page">
            {recipe.name}
          </li>
        </ol>
      </nav>

      <div className="space-y-8">
        <header>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <Badge variant="outline">{recipe.cuisine}</Badge>
            {recipe.mealType.map((type) => (
              <Badge key={type} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
          <h1
            id="recipe-title"
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance"
          >
            {recipe.name}
          </h1>

          <div className="mt-4 flex items-center gap-1.5 flex-wrap">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden rounded-2xl bg-muted">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        <section aria-label="Recipe overview">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl bg-secondary/50 p-5 border border-border">
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Prep Time
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {recipe.prepTimeMinutes} min
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                Cook Time
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {recipe.cookTimeMinutes} min
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Servings
              </dt>
              <dd className="text-sm font-semibold text-foreground">{recipe.servings}</dd>
            </div>
            <div className="flex flex-col gap-1">
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
                  ({recipe.reviewCount} reviews)
                </span>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground flex items-center gap-1">
                <ChefHat className="h-3.5 w-3.5" aria-hidden="true" />
                Difficulty
              </dt>
              <dd className="text-sm font-semibold text-foreground">{recipe.difficulty}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">Total Time</dt>
              <dd className="text-sm font-semibold text-foreground">{totalTime} min</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted-foreground">Calories</dt>
              <dd className="text-sm font-semibold text-foreground">
                {recipe.caloriesPerServing} / serving
              </dd>
            </div>
          </dl>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-1" aria-labelledby="ingredients-heading">
            <h2
              id="ingredients-heading"
              className="text-xl font-bold tracking-tight text-foreground mb-4"
            >
              Ingredients
            </h2>
            <ul className="space-y-2.5" role="list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span
                    className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <Separator className="lg:hidden" />

          <section className="lg:col-span-2" aria-labelledby="instructions-heading">
            <h2
              id="instructions-heading"
              className="text-xl font-bold tracking-tight text-foreground mb-4"
            >
              Instructions
            </h2>
            <ol className="space-y-4" role="list">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold"
                    aria-label={`Step ${index + 1}`}
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </article>
  )
}

const RecipeDetailSkeleton = () => {
  return (
    <div
      className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8"
      aria-busy="true"
      aria-label="Loading recipe"
    >
      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-14 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="h-9 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-9 w-1/2 bg-muted rounded animate-pulse" />
      </div>
      <div className="aspect-[16/8] sm:aspect-[16/7] rounded-2xl bg-muted animate-pulse" />
      <div className="grid grid-cols-4 gap-4 rounded-xl bg-secondary/50 p-5 border border-border">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-12 bg-muted rounded animate-pulse" />
            <div className="h-4 w-10 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/recipe/$recipeId/$slug")({
  loader: ({ context, params }) => {
    const id = Number(params.recipeId)
    if (Number.isNaN(id)) return
    return context.queryClient.ensureQueryData({
      queryKey: recipeDetailKeys.detail(id),
      queryFn: () => fetchRecipe(id),
    })
  },
  component: RecipeDetailPage,
})
