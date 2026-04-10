import { Separator } from "@/components/ui/separator"

export const PrivacyCoreSections = () => {
  return (
    <div className="prose-like space-y-8 text-foreground">
      <section aria-labelledby="privacy-intro">
        <h2 id="privacy-intro" className="sr-only">
          Introduction
        </h2>
        <p className="text-muted-foreground leading-7">
          Spoonbowl (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) explains how we handle
          information when you use this recipe site, including GDPR, CCPA/CPRA, and CalOPPA notices
          where relevant.
        </p>
      </section>

      <Separator />

      <section aria-labelledby="information-collected">
        <h2 id="information-collected" className="text-xl font-bold tracking-tight mb-3">
          1. Information we collect
        </h2>
        <h3 className="font-semibold mt-4 mb-2">Information you provide</h3>
        <p className="text-muted-foreground leading-7">
          Spoonbowl does not require registration or collect personally identifiable information you
          type in. You can browse recipes without providing personal data.
        </p>
        <h3 className="font-semibold mt-4 mb-2">Automatically collected</h3>
        <p className="text-muted-foreground leading-7">
          Standard log-style data may be processed when you load the site, including browser type,
          OS, referring URLs, pages visited, time on page, and IP address (anonymized where
          possible).
        </p>
        <h3 className="font-semibold mt-4 mb-2">Local storage and cookies</h3>
        <p className="text-muted-foreground leading-7">
          We use <strong>localStorage</strong> for theme (light/dark/system). It stays on your
          device and is not sent to our servers. We do not use tracking or third-party ad cookies.
        </p>
      </section>

      <Separator />

      <section aria-labelledby="how-we-use">
        <h2 id="how-we-use" className="text-xl font-bold tracking-tight mb-3">
          2. How we use information
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Operate the site, improve performance, diagnose issues, and help prevent abuse</li>
        </ul>
        <p className="text-muted-foreground leading-7 mt-3">
          We do not sell, rent, or trade your information for marketing.
        </p>
      </section>

      <Separator />

      <section aria-labelledby="third-parties">
        <h2 id="third-parties" className="text-xl font-bold tracking-tight mb-3">
          3. Third-party services
        </h2>
        <p className="text-muted-foreground leading-7 mb-4">
          Third parties below; the <strong>only</strong> link to our host&apos;s privacy policy is
          under Cloudflare.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4 bg-card">
            <h3 className="font-semibold mb-1">DummyJSON API</h3>
            <p className="text-sm text-muted-foreground">
              Browser requests go to DummyJSON; nothing you type on Spoonbowl is sent with them.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4 bg-card">
            <h3 className="font-semibold mb-1">Images (DummyJSON CDN)</h3>
            <p className="text-sm text-muted-foreground">
              Images load from DummyJSON&apos;s CDN; your IP may be visible there.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4 bg-card">
            <h3 className="font-semibold mb-1">Hosting — Cloudflare Pages</h3>
            <p className="text-sm text-muted-foreground">
              The site is hosted on <strong>Cloudflare Pages</strong> and delivered through
              Cloudflare&apos;s network. They may process connection metadata (IP, URL, timestamps,
              and related technical data) as described in{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                className="underline hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare&apos;s Privacy Policy
              </a>
              . We do not control Cloudflare&apos;s logging or retention.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="data-storage">
        <h2 id="data-storage" className="text-xl font-bold tracking-tight mb-3">
          4. How data is stored
        </h2>
        <p className="text-muted-foreground leading-7">
          We do not store personal user data on our own servers. On your device you may have:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
          <li>
            <strong>Theme preference</strong> in localStorage (&quot;light&quot;, &quot;dark&quot;,
            or &quot;system&quot;)
          </li>
          <li>
            <strong>PWA service worker cache</strong> for recipes and images (see §6 for retention)
          </li>
        </ul>
        <p className="text-muted-foreground leading-7 mt-3">
          You can clear site data anytime in browser settings.
        </p>
      </section>
    </div>
  )
}
