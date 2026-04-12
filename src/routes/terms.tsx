import { createFileRoute, Link } from "@tanstack/react-router"
import { LEGAL_DATES } from "@/lib/config/legalDates"
import { Separator } from "@/components/ui/separator"

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-muted-foreground">
          Effective date: {LEGAL_DATES.effectiveDate} &middot; Last updated:{" "}
          {LEGAL_DATES.lastUpdated}
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="terms-intro">
          <h2 id="terms-intro" className="sr-only">
            Introduction
          </h2>
          <p className="text-muted-foreground leading-7">
            These Terms of Use ("Terms") govern your access to and use of spoonbowl.app and related
            pages (collectively, the "Service"). By using the Service, you agree to these Terms. If
            you do not agree, do not use the Service.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-acceptance">
          <h2 id="terms-acceptance" className="text-xl font-bold tracking-tight mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-7">
            These Terms apply to all visitors and users of the Service. Your use of the Service is
            also subject to our{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>{" "}
            (including regional privacy notices), which explains how we handle personal data.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-service">
          <h2 id="terms-service" className="text-xl font-bold tracking-tight mb-3">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is a free recipe discovery website. The Service currently includes:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>Recipe data sourced from the DummyJSON public API</li>
            <li>Recipe search, browse, and detail pages</li>
            <li>An installable Progressive Web App (PWA) experience on supported devices</li>
            <li>Light and dark theme options</li>
          </ul>
          <p className="text-muted-foreground leading-7 mt-3">
            We may update, limit, or discontinue features at any time.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-use">
          <h2 id="terms-use" className="text-xl font-bold tracking-tight mb-3">
            3. Permitted Use
          </h2>
          <p className="text-muted-foreground leading-7">
            You may use Spoonbowl for lawful, personal, non-commercial purposes. You must not:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>Use the Service in violation of applicable law or regulations</li>
            <li>Attempt unauthorized access to the Service, related systems, or networks</li>
            <li>
              Use bots, scraping, or automated traffic to overload, disrupt, or abuse the Service
            </li>
            <li>Use the Service to transmit malicious code or unlawful content</li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="terms-ip">
          <h2 id="terms-ip" className="text-xl font-bold tracking-tight mb-3">
            4. Intellectual Property
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
            <li className="leading-7">
              <strong className="text-foreground">Our Content:</strong> The Spoonbowl name, logo,
              website design, and original site content are owned by Spoonbowl and protected by
              applicable intellectual property laws. You may not reproduce or distribute this
              content without permission, except as allowed by law.
            </li>
            <li className="leading-7">
              <strong className="text-foreground">Recipe Content:</strong> Recipe data displayed on
              Spoonbowl is sourced from DummyJSON, a public API. This data is provided for
              informational and educational purposes. All recipe content remains subject to
              DummyJSON's terms of service and any applicable third-party rights.
            </li>
            <li className="leading-7">
              <strong className="text-foreground">Open-source Software:</strong> Components used to
              build Spoonbowl remain subject to their respective open-source licenses.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="terms-disclaimer">
          <h2 id="terms-disclaimer" className="text-xl font-bold tracking-tight mb-3">
            5. Disclaimer of Warranties
          </h2>
          <p className="text-muted-foreground leading-7">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SPOONBOWL MAKES NO
            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-muted-foreground leading-7 mt-3">We do not warrant that:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>The Service will be uninterrupted, error-free, or secure</li>
            <li>Recipe information is accurate, complete, or suitable for your dietary needs</li>
            <li>Results obtained from using the Service will be accurate or reliable</li>
          </ul>
          <p className="text-muted-foreground leading-7 mt-3">
            For food safety, allergies, and dietary suitability limitations, review our{" "}
            <Link to="/disclaimer" className="underline hover:text-foreground transition-colors">
              Disclaimer
            </Link>
            .
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-liability">
          <h2 id="terms-liability" className="text-xl font-bold tracking-tight mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-7">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPOONBOWL SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
            LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS
            TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-links">
          <h2 id="terms-links" className="text-xl font-bold tracking-tight mb-3">
            7. Third-Party Links and Services
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
            <li className="leading-7">
              Spoonbowl may link to or rely on third-party services (including DummyJSON). We do not
              control and are not responsible for third-party content, availability, or policies.
              Use of third-party services is subject to their terms.
            </li>
            <li className="leading-7">
              <strong className="text-foreground">Infrastructure:</strong> The Service is hosted on{" "}
              <strong>Cloudflare Pages</strong> and delivered through Cloudflare&apos;s network.
              Availability and processing of technical connection data are subject to{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                className="underline hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare&apos;s policies
              </a>
              . Spoonbowl is not responsible for outages, delays, or issues caused by Cloudflare or
              other infrastructure providers.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="terms-changes">
          <h2 id="terms-changes" className="text-xl font-bold tracking-tight mb-3">
            8. Changes to Terms
          </h2>
          <p className="text-muted-foreground leading-7">
            We may update these Terms from time to time. Changes are effective when posted on this
            page, unless a different effective date is shown. Continued use of the Service after
            changes are posted means you accept the updated Terms.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-suspension">
          <h2 id="terms-suspension" className="text-xl font-bold tracking-tight mb-3">
            9. Suspension or Termination
          </h2>
          <p className="text-muted-foreground leading-7">
            We may suspend or terminate access to the Service if we reasonably believe there is
            abuse of the Service, unlawful activity, or behavior that risks harm to users,
            Spoonbowl, or infrastructure providers.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-law">
          <h2 id="terms-law" className="text-xl font-bold tracking-tight mb-3">
            10. Governing Law and Venue
          </h2>
          <p className="text-muted-foreground leading-7">
            These Terms are governed by the laws applicable in the principal place of business of
            Spoonbowl&apos;s operator, without regard to conflict-of-laws rules. Where permitted by
            law, disputes arising from these Terms or the Service will be brought in the competent
            courts of that jurisdiction.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-severability">
          <h2 id="terms-severability" className="text-xl font-bold tracking-tight mb-3">
            11. Severability and Waiver
          </h2>
          <p className="text-muted-foreground leading-7">
            If any part of these Terms is found unenforceable, the remaining provisions remain in
            effect. Any failure by Spoonbowl to enforce a provision is not a waiver of future
            enforcement.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-contact">
          <h2 id="terms-contact" className="text-xl font-bold tracking-tight mb-3">
            12. Contact
          </h2>
          <p className="text-muted-foreground leading-7">
            For questions regarding these Terms of Use, please contact us at{" "}
            <a
              href="mailto:legal@spoonbowl.app"
              className="underline hover:text-foreground transition-colors"
            >
              legal@spoonbowl.app
            </a>
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
