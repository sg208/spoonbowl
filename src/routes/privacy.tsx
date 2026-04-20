import { createFileRoute, Link } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"

const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy
        </h1>
        <p className="mt-4 text-muted-foreground leading-7">
          Spoonbowl is a small recipe discovery site. We do not run Google Analytics, advertising
          trackers, or similar analytics products for profiling visitors.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="privacy-browsing">
          <h2 id="privacy-browsing" className="text-xl font-bold tracking-tight mb-3">
            What you share by simply browsing
          </h2>
          <p className="text-muted-foreground leading-7">
            When you open a page, technical information travels the way it always does on the web:
            your browser asks servers for files, and those servers see data such as your IP address,
            the page or file requested, and rough timing. That is ordinary internet plumbing, not
            something unique to Spoonbowl.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="privacy-services">
          <h2 id="privacy-services" className="text-xl font-bold tracking-tight mb-3">
            Who helps us deliver the site
          </h2>
          <p className="text-muted-foreground leading-7 mb-3">
            We rely on a few services so the site loads and stays online:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-7">
            <li>
              <strong className="text-foreground">Cloudflare</strong> sits in front of the domain
              for DNS and network services (for example routing, security, and performance).
              Cloudflare processes visitor traffic as part of that role. Its own policies describe
              what it collects and why.
            </li>
            <li>
              <strong className="text-foreground">Railway</strong> hosts the built application. When
              you request a page or file, Railway (and any edge or cache they use to deliver it) may
              process the same kind of technical data as any host.
            </li>
            <li>
              Recipe text and images come from third-party recipe data via API. Your browser loads
              those assets through the same request path as the app, and image hosts or CDNs
              involved with that data may see technical data tied to those requests, the way any
              external content would.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="privacy-client">
          <h2 id="privacy-client" className="text-xl font-bold tracking-tight mb-3">
            Fonts, offline cache, and storage
          </h2>
          <p className="text-muted-foreground leading-7">
            Fonts are bundled locally where we package them — we avoid remote font services in the
            page head for our own UI typography. A service worker may cache pages and same-origin
            assets on your device for speed and a simple offline fallback; that cache stays on your
            device. We do not use cookies for marketing or analytics; storage tied to caching, if
            present, is for technical use, not cross-site tracking.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="privacy-children">
          <h2 id="privacy-children" className="text-xl font-bold tracking-tight mb-3">
            Children
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is general-audience recipe browsing and is not aimed at collecting data from
            children. Direct contact channels are not available at the moment; when a clear way to
            reach us exists, parents and guardians can use it for concerns.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="privacy-updates">
          <h2 id="privacy-updates" className="text-xl font-bold tracking-tight mb-3">
            Updates
          </h2>
          <p className="text-muted-foreground leading-7">
            If our stack or practices change in a way that matters for privacy, we will update this
            page to reflect that. This is a transparency page, not a contract; for rules about using
            the site, see{" "}
            <Link to="/terms" className="underline hover:text-foreground transition-colors">
              Terms of use
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
})
