import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/accessibility")({
  component: AccessibilityPage,
})

const AccessibilityPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Helmet>
        <title>Accessibility</title>
        <meta
          name="description"
          content="Spoonbowl's accessibility statement — our commitment to WCAG 2.1 Level AA compliance."
        />
      </Helmet>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Accessibility
        </h1>
        <p className="mt-4 text-muted-foreground leading-7">
          When we say &quot;accessibility,&quot; we mean the basics: more people can find their way
          around, read the text, use a keyboard where it matters, and not get lost in layout or
          wording. Spoonbowl treats that as part of doing the project well — not as an extra polish
          layer at the end.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="accessibility-today">
          <h2 id="accessibility-today" className="text-xl font-bold tracking-tight mb-3">
            What we aim for today
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-7">
            <li>
              Clear page structure (landmarks such as header, main navigation, main content, and
              footer).
            </li>
            <li>
              Interactive pieces (such as the menu) built so keyboard and screen-reader users can
              open, move through, and close them where applicable.
            </li>
            <li>
              Readable type and color choices we control, with calm contrast so browsing stays easy
              on the eyes.
            </li>
            <li>Meaningful headings on list and detail pages so you can skim and jump.</li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="accessibility-imperfect">
          <h2 id="accessibility-imperfect" className="text-xl font-bold tracking-tight mb-3">
            We are not perfect
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is small and changes over time. We test in browsers and with automated checks,
            but we do not catch everything. A combination of device, assistive technology, and
            personal preference can still surface barriers we have not seen yet. If you hit one, it
            is real, even if this page says we try hard.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="accessibility-improving">
          <h2 id="accessibility-improving" className="text-xl font-bold tracking-tight mb-3">
            Still improving
          </h2>
          <p className="text-muted-foreground leading-7">
            We revisit layouts, copy, and behavior as the site grows. When we learn about a problem,
            we want to fix it or explain honestly if a fix will take longer. Accessibility is
            ongoing work, not a one-time checkbox.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="accessibility-feedback">
          <h2 id="accessibility-feedback" className="text-xl font-bold tracking-tight mb-3">
            If something is hard to use
          </h2>
          <p className="text-muted-foreground leading-7 mb-4">
            You can report barriers on{" "}
            <a
              href="https://github.com/sg208/spoonbowl/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label="Report an accessibility issue for Spoonbowl on GitHub (opens in a new tab)"
            >
              GitHub Issues
            </a>
            . Include what you were trying to do, what blocked you, and—if you know them—your
            device, browser, and assistive technology (for example VoiceOver or NVDA). A public
            GitHub account is required to open an issue.
          </p>
        </section>
      </div>
    </div>
  )
}
