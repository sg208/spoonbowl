import { createFileRoute, Link } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { Separator } from "@/components/ui/separator"

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Helmet>
        <title>Terms of use</title>
        <meta
          name="description"
          content="Terms of use for Spoonbowl — a recipe discovery app for browsing and exploring meals."
        />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
      </Helmet>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Terms of use
        </h1>
        <p className="mt-4 text-muted-foreground leading-7">
          By using Spoonbowl, you agree to these terms. If something here does not work for you,
          please stop using the site.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="terms-what">
          <h2 id="terms-what" className="text-xl font-bold tracking-tight mb-3">
            What Spoonbowl is
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl offers recipe discovery for browsing and inspiration — informational, not a
            cooking service or professional advice. Nothing here replaces qualified help for
            allergies, health conditions, or special diets. Our{" "}
            <Link to="/disclaimer" className="underline hover:text-foreground transition-colors">
              Disclaimer
            </Link>{" "}
            states content limits; it is part of how we expect the site to be used.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-ip">
          <h2 id="terms-ip" className="text-xl font-bold tracking-tight mb-3">
            Intellectual property
          </h2>
          <p className="text-muted-foreground leading-7">
            The Spoonbowl name, site design, and original UI copy belong to the project. Recipe text
            and images come from third-party APIs; they remain subject to those sources&apos; terms
            and rights. Build dependencies stay under their open-source licenses. Do not copy our
            branding or scrape in ways that violate those rules.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-third-party">
          <h2 id="terms-third-party" className="text-xl font-bold tracking-tight mb-3">
            Third-party services
          </h2>
          <p className="text-muted-foreground leading-7">
            <strong className="text-foreground">Cloudflare</strong> (DNS and network services) and{" "}
            <strong className="text-foreground">Bunny.net</strong> (hosting and CDN) help deliver
            the site. Their terms and policies apply on their side; we summarize visitor-data basics
            in{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy
            </Link>
            . Recipe data and outbound links may involve other services we do not control.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-use">
          <h2 id="terms-use" className="text-xl font-bold tracking-tight mb-3">
            Acceptable use
          </h2>
          <p className="text-muted-foreground leading-7">
            Use Spoonbowl lawfully for personal browsing. Do not probe or overload the site, send
            malicious code, or run abusive automation.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-changes">
          <h2 id="terms-changes" className="text-xl font-bold tracking-tight mb-3">
            Changes and availability
          </h2>
          <p className="text-muted-foreground leading-7">
            We may change features or these terms. The site may be unavailable at times. We do not
            promise uninterrupted access.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-legal">
          <h2 id="terms-legal" className="text-xl font-bold tracking-tight mb-3">
            Warranties, liability, and privacy
          </h2>
          <p className="text-muted-foreground leading-7">
            THE SITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE FULLEST
            EXTENT PERMITTED BY LAW, SPOONBOWL DISCLAIMS WARRANTIES AND IS NOT LIABLE FOR INDIRECT
            OR CONSEQUENTIAL DAMAGES FROM YOUR USE. RECIPE INFORMATION MAY BE WRONG OR UNSUITABLE
            FOR YOUR DIET — SEE THE{" "}
            <Link to="/disclaimer" className="underline hover:text-foreground transition-colors">
              DISCLAIMER
            </Link>
            . YOUR TOTAL CLAIMS RELATED TO FREE BROWSING ARE CAPPED AT WHAT YOU PAID: ZERO. For how
            technical data may be processed when you visit, see{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/terms")({
  component: TermsPage,
})
