import { createRootRoute } from "@tanstack/react-router"
import { NotFoundPage } from "@/components/NotFoundPage"
import { RootLayout } from "@/components/RootLayout"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
