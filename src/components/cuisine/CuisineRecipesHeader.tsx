import type { RecipesResponse } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"

type CuisineRecipesHeaderProps = {
  cuisine: string
  emoji: string
  pageTitle: string
  description: string
  isLoading: boolean
  data: RecipesResponse | undefined
}

export const CuisineRecipesHeader = ({
  cuisine,
  emoji,
  pageTitle,
  description,
  isLoading,
  data,
}: CuisineRecipesHeaderProps) => (
  <header className="mb-10" aria-labelledby="cuisine-page-heading">
    <div className="flex items-start gap-4">
      <span
        className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl sm:text-4xl border border-border"
        aria-hidden="true"
      >
        {emoji}
      </span>
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge className="bg-primary/10 text-primary border-0 text-xs font-medium gap-1">
            <Globe className="h-3 w-3" aria-hidden="true" />
            {cuisine}
          </Badge>
          {!isLoading && data && (
            <Badge variant="outline" className="text-xs">
              {data.total} {data.total === 1 ? "recipe" : "recipes"}
            </Badge>
          )}
        </div>
        <h1
          id="cuisine-page-heading"
          className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance"
        >
          {pageTitle}
        </h1>
        <p className="mt-2 text-muted-foreground leading-7 max-w-2xl">{description}</p>
      </div>
    </div>
  </header>
)
