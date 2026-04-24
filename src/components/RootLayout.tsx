import { Outlet } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { Footer } from "@/components/Footer"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { Navbar } from "@/components/Navbar"
import { RouteAnnouncer } from "@/components/RouteAnnouncer"
import { Toaster } from "@/components/ui/sonner"

export const RootLayout = () => (
  <div className="flex min-h-svh flex-col">
    <Helmet />
    <Navbar />
    <main id="main-content" className="flex-1" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
    <MobileBottomNav />
    <Toaster />
    <RouteAnnouncer />
  </div>
)
