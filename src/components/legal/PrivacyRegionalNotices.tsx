import { Separator } from "@/components/ui/separator"

export const PrivacyRegionalNotices = () => {
  return (
    <div className="prose-like space-y-8 text-foreground">
      <section aria-labelledby="rights-everyone">
        <h2 id="rights-everyone" className="text-xl font-bold tracking-tight mb-3">
          5. Your privacy choices (everyone)
        </h2>
        <p className="text-muted-foreground leading-7">
          You can clear locally stored data (theme preference, PWA cache) in your browser&apos;s
          site settings. You can use Spoonbowl without creating an account.
        </p>
      </section>

      <Separator />

      <section aria-labelledby="rights-regional">
        <h2 id="rights-regional" className="text-xl font-bold tracking-tight mb-3">
          6. Regional privacy rights and notices
        </h2>
        <p className="text-muted-foreground leading-7 mb-2">
          We process minimal data based on <strong>legitimate interests</strong> to run and secure
          the site, including technical processing by our host/CDN (<strong>Cloudflare</strong>) as
          described in §3. We do not use data for marketing or profiling, and we do{" "}
          <strong>not</strong> sell or share personal information for cross-context behavioral
          advertising.
        </p>
        <p className="text-muted-foreground leading-7 mb-2">
          This section covers key frameworks including GDPR (EU/EEA), CCPA/CPRA and CalOPPA
          (California), and other major privacy laws such as UK GDPR, Brazil&apos;s LGPD,
          Canada&apos;s PIPEDA, Australia&apos;s Privacy Act, Singapore&apos;s PDPA, and
          Japan&apos;s APPI.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Access, correction, and deletion rights where applicable</li>
          <li>
            Objection, restriction, portability, or consent-withdrawal rights where applicable
          </li>
          <li>Complaint rights with your local data protection authority where applicable</li>
          <li>
            Do Not Track (DNT) is honored to the extent consistent with our minimal, non-advertising
            data use
          </li>
        </ul>
        <p className="text-muted-foreground leading-7 mt-3">
          Rights and verification requirements vary by jurisdiction. Contact us using §8 and we will
          handle requests under the law that applies to your region.
        </p>
      </section>
    </div>
  )
}
