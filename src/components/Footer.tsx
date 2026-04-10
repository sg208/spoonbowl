import { Link } from "@tanstack/react-router"
import { ChefHat } from "lucide-react"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t border-border bg-card mt-auto pb-safe"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label="Spoonbowl homepage"
            >
              <ChefHat className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-primary">Spoon</span>
              <span>bowl</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Discover delicious recipes from around the world. Cook with joy, eat with love.
            </p>
          </div>

          <nav aria-label="Browse links">
            <h2 className="text-sm font-semibold text-foreground mb-3">Browse</h2>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes/tags/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Recipes by Category
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h2 className="text-sm font-semibold text-foreground mb-3">Legal</h2>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/gdpr"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  GDPR &amp; CCPA
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Accessibility and info links">
            <h2 className="text-sm font-semibold text-foreground mb-3">Accessibility</h2>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/accessibility"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Spoonbowl. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Recipe data provided by{" "}
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              DummyJSON
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
