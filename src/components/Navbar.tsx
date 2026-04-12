import { Link } from "@tanstack/react-router"
import { BarChart2, ChefHat, Globe, Tag, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/ModeToggle"
import { usePrefetchCuisinesIndex } from "@/hooks/usePrefetchCuisinesIndex"
import { browseLinks, type BrowseLinkId } from "@/lib/config/navigationLinks"

const focusMainContent = () => {
  const main = document.getElementById("main-content")
  main?.focus()
  main?.scrollIntoView({ block: "start" })
}

const getBrowseLinkIcon = (id: BrowseLinkId) => {
  if (id === "categories") return <Tag className="h-3.5 w-3.5" aria-hidden="true" />
  if (id === "mealTypes") return <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
  if (id === "cuisines") return <Globe className="h-3.5 w-3.5" aria-hidden="true" />
  if (id === "difficulties") return <BarChart2 className="h-3.5 w-3.5" aria-hidden="true" />

  return null
}

export const Navbar = () => {
  const prefetchCuisinesIndex = usePrefetchCuisinesIndex()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-safe">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault()
          focusMainContent()
        }}
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md md:flex-none flex-1 justify-center md:justify-start"
          aria-label="Spoonbowl - Go to homepage"
        >
          <ChefHat className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="whitespace-nowrap">
            <span className="text-primary">Spoon</span>
            <span>bowl</span>
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 flex-1 justify-center"
          aria-label="Main navigation"
        >
          {browseLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              onMouseEnter={link.id === "cuisines" ? prefetchCuisinesIndex : undefined}
              onFocus={link.id === "cuisines" ? prefetchCuisinesIndex : undefined}
              className={cn(
                "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                link.id !== "recipes" && "flex items-center gap-1.5"
              )}
              activeProps={{ className: "text-foreground" }}
              activeOptions={link.id === "recipes" ? { exact: true } : undefined}
            >
              {getBrowseLinkIcon(link.id)}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
