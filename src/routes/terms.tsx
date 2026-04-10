import { createFileRoute, Link } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/terms")({
  component: TermsPage,
})

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-muted-foreground">
          Effective date: April 10, 2026 &middot; Last updated: April 10, 2026
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="terms-intro">
          <p className="text-muted-foreground leading-7">
            Welcome to Spoonbowl. By accessing or using our website at spoonbowl.app (the
            "Service"), you agree to be bound by these Terms of Use ("Terms"). Please read them
            carefully. If you do not agree to these Terms, please discontinue use of the Service.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-acceptance">
          <h2 id="terms-acceptance" className="text-xl font-bold tracking-tight mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-7">
            By accessing and using Spoonbowl, you acknowledge that you have read, understood, and
            agree to be bound by these Terms, as well as our{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>{" "}
            (including regional privacy notices). These Terms apply to all visitors and users of the
            Service.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-service">
          <h2 id="terms-service" className="text-xl font-bold tracking-tight mb-3">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is a free, publicly accessible recipe discovery website. It provides:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>A curated collection of recipes fetched from the DummyJSON public API</li>
            <li>Recipe search, browsing, and detail views</li>
            <li>A Progressive Web App (PWA) that can be installed on mobile devices</li>
            <li>Dark and light theme options</li>
          </ul>
          <p className="text-muted-foreground leading-7 mt-3">
            The Service is provided "as is" without any warranties. We reserve the right to modify,
            suspend, or discontinue any part of the Service at any time without notice.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-use">
          <h2 id="terms-use" className="text-xl font-bold tracking-tight mb-3">
            3. Permitted Use
          </h2>
          <p className="text-muted-foreground leading-7">
            You may use Spoonbowl for lawful, personal, non-commercial purposes. You agree not to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>Use the Service for any unlawful purpose or in violation of applicable laws</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>
              Scrape, crawl, or systematically collect data from the Service without permission
            </li>
            <li>Use automated tools to overload or disrupt the Service</li>
            <li>Attempt to reverse-engineer any aspect of the Service</li>
            <li>Use the Service to transmit harmful, offensive, or illegal content</li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="terms-ip">
          <h2 id="terms-ip" className="text-xl font-bold tracking-tight mb-3">
            4. Intellectual Property
          </h2>
          <h3 className="font-semibold mb-2">Our Content</h3>
          <p className="text-muted-foreground leading-7">
            The Spoonbowl name, logo, website design, and original content are the property of
            Spoonbowl and are protected by applicable intellectual property laws. You may not
            reproduce, distribute, or create derivative works without our express written
            permission.
          </p>
          <h3 className="font-semibold mt-4 mb-2">Recipe Content</h3>
          <p className="text-muted-foreground leading-7">
            Recipe data displayed on Spoonbowl is sourced from DummyJSON, a public API. This data is
            provided for informational and educational purposes. All recipe content remains subject
            to DummyJSON's terms of service and any applicable third-party rights.
          </p>
          <h3 className="font-semibold mt-4 mb-2">Open Source</h3>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is built using open-source technologies including React, TanStack Router,
            TanStack Query, and Radix UI, each subject to their respective licenses.
          </p>
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
            Always consult a qualified professional before following any dietary advice.
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
          <p className="text-muted-foreground leading-7">
            Spoonbowl may contain links to third-party websites or services (such as DummyJSON). We
            are not responsible for the content, policies, or practices of any third-party website.
            Use of third-party services is at your own risk and subject to their terms.
          </p>
          <h3 className="font-semibold mt-5 mb-2">Infrastructure</h3>
          <p className="text-muted-foreground leading-7">
            The Service is hosted on <strong>Cloudflare Pages</strong> and delivered through
            Cloudflare&apos;s network. Availability, security, and processing of technical
            connection data are subject to{" "}
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
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-changes">
          <h2 id="terms-changes" className="text-xl font-bold tracking-tight mb-3">
            8. Changes to Terms
          </h2>
          <p className="text-muted-foreground leading-7">
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting the updated Terms to the website. Your continued use of the
            Service after any changes constitutes your acceptance of the new Terms. We encourage you
            to review these Terms periodically.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-law">
          <h2 id="terms-law" className="text-xl font-bold tracking-tight mb-3">
            9. Governing Law
          </h2>
          <p className="text-muted-foreground leading-7">
            These Terms shall be governed by and construed in accordance with applicable law. Any
            disputes arising under these Terms shall be subject to the exclusive jurisdiction of
            competent courts.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="terms-contact">
          <h2 id="terms-contact" className="text-xl font-bold tracking-tight mb-3">
            10. Contact
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
