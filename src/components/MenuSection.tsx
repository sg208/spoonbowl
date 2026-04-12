import type React from "react"
import { Link } from "@tanstack/react-router"

interface MenuSectionProps {
  title: string
  ariaLabel: string
  links: readonly { to: string; label: string }[]
  onLinkClick?: () => void
  onPrefetch?: (to: string) => void
}

export const MenuSection = ({
  title,
  ariaLabel,
  links,
  onLinkClick,
  onPrefetch,
}: MenuSectionProps): React.JSX.Element => {
  return (
    <nav aria-label={ariaLabel} className="mb-6">
      <p className="px-4 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        {title}
      </p>
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            onMouseEnter={() => onPrefetch?.(link.to)}
            onFocus={() => onPrefetch?.(link.to)}
            className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            activeProps={{ className: "text-foreground bg-accent" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
