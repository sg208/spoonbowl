import { Outlet } from "@tanstack/react-router"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/sonner"

export const RootLayout = () => (
  <div className="flex min-h-svh flex-col">
    <Navbar />
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
    <Toaster />
  </div>
)
