import type React from "react"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Home, Menu, Search, X } from "lucide-react"
import { MobileSearchModal } from "@/components/MobileSearchModal"
import { ModeToggle } from "@/components/ModeToggle"
import { MenuSection } from "@/components/MenuSection"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { usePrefetchCuisinesIndex } from "@/hooks/usePrefetchCuisinesIndex"
import { browseLinks, siteLinks } from "@/lib/config/navigationLinks"

export const MobileBottomNav = (): React.JSX.Element => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prefetchCuisinesIndex = usePrefetchCuisinesIndex()

  return (
    <>
      <nav
        className="fixed bottom-nav-safe left-1/2 -translate-x-1/2 z-40 md:hidden rounded-2xl bg-background/80 backdrop-blur-md border border-border shadow-xl w-fit"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-center gap-2 px-2 py-2">
          <Button variant="ghost" size="icon" asChild aria-label="Go to home">
            <Link to="/">
              <Home className="h-[1.875rem] w-[1.875rem]" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search recipes"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-[1.875rem] w-[1.875rem]" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-[1.875rem] w-[1.875rem]" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {searchOpen && <MobileSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />}

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 translate-x-0 translate-y-0 max-w-none h-svh rounded-none p-0 flex flex-col gap-0"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-4 shrink-0">
            <DialogTitle className="text-base font-semibold">Menu</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <nav aria-label="Browse links" className="mb-6">
              <p className="px-4 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                Browse
              </p>
              <div className="space-y-1">
                {browseLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={link.id === "cuisines" ? prefetchCuisinesIndex : undefined}
                    onFocus={link.id === "cuisines" ? prefetchCuisinesIndex : undefined}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    activeProps={{ className: "text-foreground bg-accent" }}
                    activeOptions={link.id === "recipes" ? { exact: true } : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <MenuSection
              title="Information"
              ariaLabel="Site information"
              links={siteLinks}
              onLinkClick={() => setMenuOpen(false)}
            />
          </div>

          <div className="border-t border-border px-4 py-4 pb-safe shrink-0 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ModeToggle />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
