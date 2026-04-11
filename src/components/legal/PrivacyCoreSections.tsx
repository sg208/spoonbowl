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
          information when you use this recipe site, including key regional privacy notices where
          relevant.
        </p>
      </section>

      <Separator />

      <section aria-labelledby="information-collected">
        <h2 id="information-collected" className="text-xl font-bold tracking-tight mb-3">
          1. Information we collect
        </h2>
        <p className="text-muted-foreground leading-7 mb-2">
          We collect only limited data needed to run the site:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>
            <strong>Information you provide</strong>: no account or registration is required for
            normal recipe browsing.
          </li>
          <li>
            <strong>Automatically collected technical data</strong>: browser type, OS, referring
            URL, pages visited, time on page, and IP address (anonymized where possible).
          </li>
          <li>
            <strong>Local storage/cookies</strong>: <strong>localStorage</strong> is used for theme
            preference (light/dark/system). We do not use third-party ad cookies.
          </li>
        </ul>
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
        <p className="text-muted-foreground leading-7 mb-2">
          We use only essential third parties to deliver the site:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>
            <strong>DummyJSON</strong>: recipe data and images are fetched from DummyJSON endpoints
            and CDN when pages load.
          </li>
          <li>
            <strong>Cloudflare Pages/CDN</strong>: hosting and delivery may involve technical
            connection metadata (for example, IP address, URL, and timestamps) as described in{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>No ad-tech providers</strong>: we do not use third-party advertising or
            profiling services.
          </li>
        </ul>
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
            <strong>PWA service worker cache</strong> for recipes and images
          </li>
          <li>
            <strong>Cache retention</strong>: recipe JSON for up to <strong>24 hours</strong> and
            recipe images for up to <strong>7 days</strong>, then automatically purged
          </li>
        </ul>
        <p className="text-muted-foreground leading-7 mt-3">
          You can clear site data anytime in browser settings.
        </p>
      </section>
    </div>
  )
}
