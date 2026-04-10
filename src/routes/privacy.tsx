import { createFileRoute } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
})

const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-muted-foreground">
          Effective date: April 10, 2026 &middot; Last updated: April 10, 2026
        </p>
      </header>

      <div className="prose-like space-y-8 text-foreground">
        <section aria-labelledby="privacy-intro">
          <p className="text-muted-foreground leading-7">
            Spoonbowl ("we," "us," or "our") is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard information when you visit
            our website and use our recipe discovery service.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="information-collected">
          <h2 id="information-collected" className="text-xl font-bold tracking-tight mb-3">
            1. Information We Collect
          </h2>
          <h3 className="font-semibold mt-4 mb-2">Information You Provide</h3>
          <p className="text-muted-foreground leading-7">
            Spoonbowl does not require account registration or collect any personally identifiable
            information. You can browse and explore all recipes without providing any personal data.
          </p>
          <h3 className="font-semibold mt-4 mb-2">Automatically Collected Information</h3>
          <p className="text-muted-foreground leading-7">
            When you access our website, we may automatically collect standard log data, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URLs</li>
            <li>Pages visited and time spent</li>
            <li>IP address (anonymized where possible)</li>
          </ul>
          <h3 className="font-semibold mt-4 mb-2">Local Storage &amp; Cookies</h3>
          <p className="text-muted-foreground leading-7">
            We use browser localStorage to remember your theme preference (light/dark mode). This
            data is stored entirely on your device and is never transmitted to our servers. We do
            not use tracking cookies or third-party advertising cookies.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="how-we-use">
          <h2 id="how-we-use" className="text-xl font-bold tracking-tight mb-3">
            2. How We Use Information
          </h2>
          <p className="text-muted-foreground leading-7">Any data collected is used solely to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>Operate and maintain the website</li>
            <li>Improve user experience and website performance</li>
            <li>Diagnose technical issues</li>
            <li>Ensure security and prevent abuse</li>
          </ul>
          <p className="text-muted-foreground leading-7 mt-3">
            We do not sell, rent, or trade your information to third parties for marketing purposes.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="third-parties">
          <h2 id="third-parties" className="text-xl font-bold tracking-tight mb-3">
            3. Third-Party Services
          </h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Spoonbowl uses the following third-party services:
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4 bg-card">
              <h3 className="font-semibold mb-1">DummyJSON API</h3>
              <p className="text-sm text-muted-foreground">
                We use DummyJSON (dummyjson.com) to provide recipe data. When you load recipes, your
                browser makes requests to their servers. DummyJSON is a public API and its use is
                governed by their own terms. No personal data is sent with these requests.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4 bg-card">
              <h3 className="font-semibold mb-1">Content Delivery Networks (CDN)</h3>
              <p className="text-sm text-muted-foreground">
                Recipe images are served from DummyJSON's CDN (cdn.dummyjson.com). Your IP address
                may be visible to their CDN when loading images. We have no control over CDN logging
                practices.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4 bg-card">
              <h3 className="font-semibold mb-1">Hosting — Cloudflare Pages</h3>
              <p className="text-sm text-muted-foreground">
                This website is hosted on <strong>Cloudflare Pages</strong> and delivered through{" "}
                <strong>Cloudflare&apos;s global network</strong>. When you load pages or assets
                from spoonbowl.app, Cloudflare may process connection metadata such as your IP
                address, requested URL, timestamps, and related technical data as described in{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  className="underline hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cloudflare&apos;s Privacy Policy
                </a>
                . We do not control Cloudflare&apos;s logging or retention practices.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section aria-labelledby="data-storage">
          <h2 id="data-storage" className="text-xl font-bold tracking-tight mb-3">
            4. How Data Is Stored
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl stores no personal user data on our servers. The only data stored client-side
            (on your device) includes:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>
              <strong>Theme preference</strong>: stored in localStorage as a simple string ("light",
              "dark", or "system")
            </li>
            <li>
              <strong>Service Worker cache</strong>: recipe data and images may be cached locally by
              our PWA service worker to improve performance and offline access. This cache is stored
              on your device and can be cleared through your browser settings.
            </li>
          </ul>
          <p className="text-muted-foreground leading-7 mt-3">
            You can clear all local data by clearing your browser's site data at any time.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="your-rights">
          <h2 id="your-rights" className="text-xl font-bold tracking-tight mb-3">
            5. Your Rights
          </h2>
          <p className="text-muted-foreground leading-7">
            Since we do not collect or store personal information, there is minimal personal data to
            manage. However, you have the right to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>
              Clear all locally stored data (theme preferences, cache) via your browser settings
            </li>
            <li>Browse our site without any form of account</li>
            <li>
              Request information about what data Cloudflare may hold in connection with serving
              this site (see Cloudflare&apos;s privacy policy)
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="children-privacy">
          <h2 id="children-privacy" className="text-xl font-bold tracking-tight mb-3">
            6. Children's Privacy
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl does not knowingly collect personal data from children under 13 years of age.
            Our service is a general-audience recipe site with no registration features.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="contact-privacy">
          <h2 id="contact-privacy" className="text-xl font-bold tracking-tight mb-3">
            7. Contact Us
          </h2>
          <p className="text-muted-foreground leading-7">
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:privacy@spoonbowl.app"
              className="underline hover:text-foreground transition-colors"
            >
              privacy@spoonbowl.app
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
