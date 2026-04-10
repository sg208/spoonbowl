import { createFileRoute } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const Route = createFileRoute("/gdpr")({
  component: GdprPage,
})

const GdprPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="outline">GDPR</Badge>
          <Badge variant="outline">CCPA</Badge>
          <Badge variant="outline">CalOPPA</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy Rights &amp; Compliance
        </h1>
        <p className="mt-3 text-muted-foreground">
          GDPR (EU), CCPA (California), and applicable privacy regulations. Effective: April 10,
          2026.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="gdpr-intro">
          <p className="text-muted-foreground leading-7">
            Spoonbowl respects the privacy rights of all users, including those protected under the
            European Union General Data Protection Regulation (GDPR), the California Consumer
            Privacy Act (CCPA), and the California Online Privacy Protection Act (CalOPPA). This
            page explains your rights and our minimal data practices.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="gdpr-section">
          <h2 id="gdpr-section" className="text-xl font-bold tracking-tight mb-3">
            GDPR — European Union Users
          </h2>
          <p className="text-muted-foreground leading-7 mb-4">
            If you are located in the European Union or European Economic Area, the GDPR provides
            you with specific data protection rights.
          </p>

          <h3 className="font-semibold mb-2">Legal Basis for Processing</h3>
          <p className="text-muted-foreground leading-7 mb-4">
            We process minimal data based on <strong>legitimate interests</strong> (operating a
            functional website) and <strong>legal obligations</strong> (connection and security logs
            processed by <strong>Cloudflare</strong> when serving this site via{" "}
            <strong>Cloudflare Pages</strong>). We do not process personal data based on consent for
            marketing or profiling purposes.
          </p>

          <h3 className="font-semibold mb-2">Your GDPR Rights</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Right of Access (Art. 15)</strong>: You may request a copy of any personal
              data we hold about you. Since we collect no personal data directly, there is typically
              nothing to provide.
            </li>
            <li>
              <strong>Right to Rectification (Art. 16)</strong>: You may request correction of
              inaccurate data.
            </li>
            <li>
              <strong>Right to Erasure (Art. 17)</strong>: You may request deletion of your personal
              data. Client-side data can be deleted through your browser's site data settings.
            </li>
            <li>
              <strong>Right to Restrict Processing (Art. 18)</strong>: You may request restriction
              of processing of your data.
            </li>
            <li>
              <strong>Right to Data Portability (Art. 20)</strong>: Where applicable, you may
              request your data in a portable format.
            </li>
            <li>
              <strong>Right to Object (Art. 21)</strong>: You may object to processing based on
              legitimate interests.
            </li>
            <li>
              <strong>Right to Lodge a Complaint</strong>: You have the right to lodge a complaint
              with your national data protection authority.
            </li>
          </ul>

          <h3 className="font-semibold mt-5 mb-2">Data Transfers</h3>
          <p className="text-muted-foreground leading-7 mb-4">
            Recipe data is fetched from DummyJSON, a service that may be hosted outside the EU. No
            personal data is transmitted in these requests — only a standard HTTP request is made to
            retrieve recipe information.
          </p>
          <p className="text-muted-foreground leading-7">
            When you visit spoonbowl.app, your traffic may be routed through{" "}
            <strong>Cloudflare&apos;s global network</strong> (EU/EEA or elsewhere). How Cloudflare
            processes connection data is described in{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare&apos;s Privacy Policy
            </a>
            .
          </p>

          <h3 className="font-semibold mt-5 mb-2">Data Retention</h3>
          <p className="text-muted-foreground leading-7">
            We retain no personal data on our servers. Service worker cache is stored on your device
            for up to 7 days for recipe images and 24 hours for recipe data, after which it is
            automatically purged.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="ccpa-section">
          <h2 id="ccpa-section" className="text-xl font-bold tracking-tight mb-3">
            CCPA — California Residents
          </h2>
          <p className="text-muted-foreground leading-7 mb-4">
            If you are a California resident, the California Consumer Privacy Act (CCPA) and the
            California Privacy Rights Act (CPRA) provide additional rights regarding your personal
            information.
          </p>

          <h3 className="font-semibold mb-2">Categories of Personal Information Collected</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold">Category</th>
                  <th className="text-left py-2 pr-4 font-semibold">Collected?</th>
                  <th className="text-left py-2 font-semibold">Sold/Shared?</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Identifiers (name, email, IP)</td>
                  <td className="py-2 pr-4">Yes — IP via Cloudflare edge logs only</td>
                  <td className="py-2">No</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Internet or network activity</td>
                  <td className="py-2 pr-4">Yes — IP via Cloudflare edge logs only</td>
                  <td className="py-2">No</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Geolocation data</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">No</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Commercial information</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">No</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Inferences / profiles</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold mt-5 mb-2">Your CCPA Rights</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Right to Know</strong>: You may request disclosure of the categories and
              specific pieces of personal information we have collected about you.
            </li>
            <li>
              <strong>Right to Delete</strong>: You may request deletion of personal information we
              have collected. Client-side data can be deleted via browser settings.
            </li>
            <li>
              <strong>Right to Opt-Out of Sale</strong>: We do not sell personal information. We
              will not sell your personal information.
            </li>
            <li>
              <strong>Right to Non-Discrimination</strong>: We will not discriminate against you for
              exercising any of your CCPA rights.
            </li>
            <li>
              <strong>Right to Correct</strong>: You may request correction of inaccurate personal
              information.
            </li>
            <li>
              <strong>Right to Limit Use of Sensitive Personal Information</strong>: We do not
              collect or use sensitive personal information.
            </li>
          </ul>

          <h3 className="font-semibold mt-5 mb-2">Do Not Sell or Share My Personal Information</h3>
          <p className="text-muted-foreground leading-7">
            Spoonbowl does not sell or share personal information for cross-context behavioral
            advertising. No opt-out action is required.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="caloppa-section">
          <h2 id="caloppa-section" className="text-xl font-bold tracking-tight mb-3">
            CalOPPA Compliance
          </h2>
          <p className="text-muted-foreground leading-7">
            In accordance with the California Online Privacy Protection Act (CalOPPA), Spoonbowl:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>Posts this Privacy Policy and makes it easily accessible</li>
            <li>Identifies the categories of personally identifiable information collected</li>
            <li>Explains how users can review and request changes to their information</li>
            <li>Discloses how we respond to "Do Not Track" signals</li>
          </ul>
          <h3 className="font-semibold mt-5 mb-2">Do Not Track</h3>
          <p className="text-muted-foreground leading-7">
            Our website honors Do Not Track (DNT) signals. We do not engage in cross-site tracking.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="gdpr-contact">
          <h2 id="gdpr-contact" className="text-xl font-bold tracking-tight mb-3">
            Exercising Your Rights
          </h2>
          <p className="text-muted-foreground leading-7">
            To exercise any of the rights described above, or to ask questions about this policy,
            contact us at:
          </p>
          <div className="mt-3 rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">Spoonbowl Privacy Team</p>
            <p className="text-sm text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:privacy@spoonbowl.app"
                className="underline hover:text-foreground transition-colors"
              >
                privacy@spoonbowl.app
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We will respond to verifiable requests within 30 days (GDPR) or 45 days (CCPA).
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
