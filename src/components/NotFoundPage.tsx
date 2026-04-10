import { lazy, Suspense, useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { RecipeCardSkeleton } from "@/components/RecipeCardSkeleton"
import { pickRandomNotFoundMessage } from "@/lib/not-found-messages"

const NotFoundRandomRecipe = lazy(() => import("@/components/NotFoundRandomRecipe"))

export const NotFoundPage = () => {
  const foodieLine = useMemo(() => pickRandomNotFoundMessage(), [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <section aria-labelledby="not-found-heading" className="mx-auto max-w-2xl text-center">
        <h1
          id="not-found-heading"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
        >
          Page not found
        </h1>
        <p className="mt-4 text-balance text-lg text-muted-foreground">{foodieLine}</p>
        <p className="mt-6">
          <Link
            to="/"
            className="inline-flex rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to home
          </Link>
        </p>
      </section>

      <section aria-labelledby="random-recipe-heading" className="mx-auto mt-14 max-w-xl sm:mt-16">
        <h2
          id="random-recipe-heading"
          className="text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          While you&apos;re here&hellip;
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Here&apos;s a random recipe you might like.
        </p>
        <div className="mt-6">
          <Suspense
            fallback={
              <div className="mx-auto grid max-w-sm grid-cols-1">
                <RecipeCardSkeleton />
              </div>
            }
          >
            <NotFoundRandomRecipe />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
