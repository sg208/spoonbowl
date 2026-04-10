import { useEffect, useState } from "react"
import { useRouterState } from "@tanstack/react-router"

export const RouteAnnouncer = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const status = useRouterState({ select: (s) => s.status })
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    if (status !== "idle") return
    const id = setTimeout(() => {
      const title = document.title.trim()
      setAnnouncement(title || `Navigated to ${pathname}`)
    }, 0)
    return () => clearTimeout(id)
  }, [pathname, status])

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  )
}
