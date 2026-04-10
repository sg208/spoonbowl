import { Link } from "@tanstack/react-router"
import { ChefHat, Menu, X, Tag, UtensilsCrossed } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-safe"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label="Spoonbowl - Go to homepage"
        >
          <ChefHat className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-primary">Spoon</span>
          <span>bowl</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ exact: true }}
          >
            Recipes
          </Link>
          <Link
            to="/recipes/tags/"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            activeProps={{ className: "text-foreground" }}
          >
            <Tag className="h-3.5 w-3.5" aria-hidden="true" />
            Categories
          </Link>
          <Link
            to="/recipes/meal-types/"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            activeProps={{ className: "text-foreground" }}
          >
            <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
            Meal Types
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border bg-background pb-safe"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "text-foreground bg-accent" }}
              activeOptions={{ exact: true }}
            >
              Recipes
            </Link>
            <Link
              to="/recipes/tags/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              <Tag className="h-3.5 w-3.5" aria-hidden="true" />
              Categories
            </Link>
            <Link
              to="/recipes/meal-types/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
              Meal Types
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
