import { useEffect } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

const AboutPage = () => {
  useEffect(() => {
    document.title = "About – Spoonbowl"
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          About Spoonbowl
        </h1>
        <p className="mt-4 text-muted-foreground leading-7">
          Spoonbowl is a small, informal project for browsing and discovering recipes. It exists to
          make exploring meals and ideas a little easier — nothing more official than that.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="about-what">
          <h2 id="about-what" className="text-xl font-bold tracking-tight mb-3">
            What this is
          </h2>
          <p className="text-muted-foreground leading-7">
            The site focuses on search, filters, and recipe detail pages built from third-party
            recipe data. Features may shift as the project evolves; there is no service-level
            promise beyond trying to keep things usable and honest about limits (see the{" "}
            <Link to="/disclaimer" className="underline hover:text-foreground transition-colors">
              Disclaimer
            </Link>
            ).
          </p>
        </section>

        <Separator />

        <section aria-labelledby="about-how">
          <h2 id="about-how" className="text-xl font-bold tracking-tight mb-3">
            How it runs
          </h2>
          <p className="text-muted-foreground leading-7 mb-3">
            Delivery works the same way as other small static-plus-app sites we run: a few
            infrastructure providers keep DNS, hosting, and routing in place. In broad strokes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-7">
            <li>Cloudflare handles DNS and front-line network services for the domain.</li>
            <li>Railway hosts the built application.</li>
          </ul>
          <p className="text-muted-foreground leading-7 mt-3">
            Technical details about what those providers may process when you visit are summarized
            in the{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy
            </Link>{" "}
            page.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="about-contact">
          <h2 id="about-contact" className="text-xl font-bold tracking-tight mb-3">
            Contact
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is an independent, informal project without a public inbox at the moment. When
            there is a simple way to get in touch, this page will point to it.
          </p>
        </section>
      </div>
    </div>
  )
}
