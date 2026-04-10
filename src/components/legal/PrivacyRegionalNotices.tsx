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

      <section aria-labelledby="rights-gdpr">
        <h2 id="rights-gdpr" className="text-xl font-bold tracking-tight mb-3">
          6. GDPR — European Union / EEA users
        </h2>
        <p className="text-muted-foreground leading-7 mb-4">
          We process minimal data based on <strong>legitimate interests</strong> (running the site)
          and technical processing by our host and CDN (<strong>Cloudflare</strong>) as described in
          §3 above. We do not use consent for marketing or profiling.
        </p>
        <p className="text-muted-foreground leading-7 mb-2">
          Depending on applicable law, you may have rights to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Access, rectify, or erase personal data we hold (we do not store account data)</li>
          <li>Restrict or object to certain processing</li>
          <li>Data portability where applicable</li>
          <li>Lodge a complaint with your supervisory authority</li>
        </ul>
        <p className="text-muted-foreground leading-7 mt-4">
          Recipe requests go to DummyJSON; those calls do not include personal data you typed into
          our site. Traffic to spoonbowl.app may route through Cloudflare&apos;s global network.
        </p>
        <h3 className="font-semibold mt-5 mb-2">Retention</h3>
        <p className="text-muted-foreground leading-7">
          We retain no personal data on our servers. The PWA service worker may cache recipe images
          for up to <strong>7 days</strong> and recipe JSON for up to <strong>24 hours</strong> on
          your device, then purge automatically.
        </p>
      </section>

      <section aria-labelledby="rights-ccpa">
        <h2 id="rights-ccpa" className="text-xl font-bold tracking-tight mb-3">
          7. CCPA / CPRA — California residents
        </h2>
        <p className="text-muted-foreground leading-7">
          We do <strong>not</strong> sell or share personal information for cross-context behavioral
          advertising. Identifiers (such as IP address) and internet or network activity may appear
          in <strong>Cloudflare</strong> edge logs when you use the site, as noted in §3. We do not
          collect sensitive personal information for limited purposes under CPRA. You may have
          rights to know, delete, and correct personal information, to opt out of sale (not
          applicable here), and not to be discriminated against for exercising these rights.
        </p>
      </section>

      <section aria-labelledby="rights-caloppa">
        <h2 id="rights-caloppa" className="text-xl font-bold tracking-tight mb-3">
          8. CalOPPA and Do Not Track
        </h2>
        <p className="text-muted-foreground leading-7">
          We post this policy and describe collection and choices here. We do not engage in
          cross-site tracking; Do Not Track (DNT) signals are honored to the extent consistent with
          our minimal, non-advertising use of data.
        </p>
      </section>
    </div>
  )
}
