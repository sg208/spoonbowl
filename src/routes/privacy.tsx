import { createFileRoute } from "@tanstack/react-router"
import { PrivacyCoreSections } from "@/components/legal/PrivacyCoreSections"
import { PrivacyRegionalNotices } from "@/components/legal/PrivacyRegionalNotices"
import { Separator } from "@/components/ui/separator"

const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-6 space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground leading-7">
          Effective date: April 10, 2026 &middot; Last updated: April 11, 2026
        </p>
        <p className="text-muted-foreground leading-7">
          Includes global privacy notices where applicable, including GDPR (EU/EEA), UK GDPR,
          California (CCPA/CPRA and CalOPPA), Brazil&apos;s LGPD, Canada&apos;s PIPEDA,
          Australia&apos;s Privacy Act, Singapore&apos;s PDPA, and Japan&apos;s APPI.
        </p>
      </header>

      <PrivacyCoreSections />

      <Separator className="my-8" />

      <PrivacyRegionalNotices />

      <Separator className="my-8" />

      <div className="prose-like space-y-8 text-foreground">
        <section aria-labelledby="children-privacy">
          <h2 id="children-privacy" className="text-xl font-bold tracking-tight mb-3">
            7. Children&apos;s privacy
          </h2>
          <p className="text-muted-foreground leading-7">
            We do not knowingly collect personal data from children under 13. The site is
            general-audience recipe browsing without registration.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="contact-privacy">
          <h2 id="contact-privacy" className="text-xl font-bold tracking-tight mb-3">
            8. Contact
          </h2>
          <p className="text-muted-foreground leading-7">
            Questions or requests about this policy or your privacy rights:{" "}
            <a
              href="mailto:privacy@spoonbowl.app"
              className="underline hover:text-foreground transition-colors"
            >
              privacy@spoonbowl.app
            </a>
            . We aim to respond within a reasonable time and in line with applicable legal timelines
            for your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
})
