import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRoute({
  component: RootLayout,
})

const RootLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollRestoration />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
