import { Link } from "@tanstack/react-router"

type CuisineRecipesBreadcrumbProps = {
  pageTitle: string
  prefetchCuisinesIndex: () => void
}

export const CuisineRecipesBreadcrumb = ({
  pageTitle,
  prefetchCuisinesIndex,
}: CuisineRecipesBreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className="mb-8">
    <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
      <li>
        <Link
          to="/"
          className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          Home
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li>
        <Link
          to="/recipes/cuisines"
          onMouseEnter={prefetchCuisinesIndex}
          onFocus={prefetchCuisinesIndex}
          className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          Recipes by Cuisine
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li className="text-foreground font-medium" aria-current="page">
        {pageTitle}
      </li>
    </ol>
  </nav>
)
