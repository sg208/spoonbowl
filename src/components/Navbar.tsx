import { Link } from "@tanstack/react-router"
import { BarChart2, ChefHat, Globe, Menu, X, Tag, UtensilsCrossed } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
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
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      firstMobileLinkRef.current?.focus()
    }
  }, [open])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-safe"
      role="banner"
    >
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label="Spoonbowl - Go to homepage"
        >
          <ChefHat className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="whitespace-nowrap">
            <span className="text-primary">Spoon</span>
            <span>bowl</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
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

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
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
            {browseLinks.map((link) => (
              <Link
                key={link.id}
                ref={link.id === "recipes" ? firstMobileLinkRef : undefined}
                to={link.to}
                onClick={() => setOpen(false)}
                onMouseEnter={link.id === "cuisines" ? prefetchCuisinesIndex : undefined}
                onFocus={link.id === "cuisines" ? prefetchCuisinesIndex : undefined}
                className={cn(
                  "flex px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  link.id !== "recipes" && "items-center gap-2"
                )}
                activeProps={{ className: "text-foreground bg-accent" }}
                activeOptions={link.id === "recipes" ? { exact: true } : undefined}
              >
                {getBrowseLinkIcon(link.id)}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
