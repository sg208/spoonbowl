import { useEffect, useRef, useState } from "react"
import { useRouterState } from "@tanstack/react-router"

export const RouteAnnouncer = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const status = useRouterState({ select: (s) => s.status })
  const [announcement, setAnnouncement] = useState("")
  const clearId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (status !== "idle") return

    if (clearId.current !== null) clearTimeout(clearId.current)
    if (setId.current !== null) clearTimeout(setId.current)

    clearId.current = setTimeout(() => {
      setAnnouncement("")
      setId.current = setTimeout(() => {
        const title = document.title.trim()
        setAnnouncement(title || `Navigated to ${pathname}`)
      }, 0)
    }, 0)

    return () => {
      if (clearId.current !== null) clearTimeout(clearId.current)
      if (setId.current !== null) clearTimeout(setId.current)
    }
  }, [pathname, status])

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  )
}
