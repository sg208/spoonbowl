import { createFileRoute } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const Route = createFileRoute("/accessibility")({
  component: AccessibilityPage,
})

const AccessibilityPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">WCAG 2.1</Badge>
          <Badge variant="outline">WCAG 2.2</Badge>
          <Badge className="bg-accent text-accent-foreground">Working Reference</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Accessibility Statement
        </h1>
        <p className="mt-3 text-muted-foreground">Last updated: April 11, 2026</p>
      </header>

      <p className="mb-8 text-muted-foreground leading-7">
        We are committed to meeting WCAG 2.1 and 2.2 Level AA standards. While our accessibility
        work is still evolving, we continuously improve Spoonbowl to make every visit more
        inclusive.
      </p>

      <Separator className="my-8" />

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="access-scope">
          <h2 id="access-scope" className="text-xl font-bold tracking-tight mb-3">
            1. Scope and Intent
          </h2>
          <p className="text-muted-foreground leading-7">
            This statement reflects the accessibility behaviors currently implemented in Spoonbowl.
            It is based on features present in the codebase today and is updated as those
            implementations change. We use WCAG 2.1 and 2.2 Level AA as references for ongoing
            improvements.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="access-features">
          <h2 id="access-features" className="text-xl font-bold tracking-tight mb-3">
            2. Implemented Accessibility Features
          </h2>
          <p className="text-muted-foreground leading-7 mb-4">
            The following items are currently implemented:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Semantic structure</strong>: The app shell uses landmark elements, including
              header, navigation, main content, and footer regions.
            </li>
            <li>
              <strong>Skip link</strong>: A &quot;Skip to main content&quot; control appears before
              navigation and moves focus to the main content container.
            </li>
            <li>
              <strong>Keyboard and focus support</strong>: Interactive controls expose visible focus
              styles and keyboard-friendly state handling (for example, menu open/close and escape
              handling).
            </li>
            <li>
              <strong>Accessible names and states</strong>: Navigation regions and key controls
              include labels and ARIA state attributes where needed.
            </li>
            <li>
              <strong>Route change announcements</strong>: A dedicated polite live region announces
              route changes for screen reader users.
            </li>
            <li>
              <strong>Loading semantics</strong>: Loading views include
              <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-busy</code> and status
              roles in recipe route states.
            </li>
            <li>
              <strong>Theme options</strong>: The interface provides light/dark theme toggling.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="access-limitations">
          <h2 id="access-limitations" className="text-xl font-bold tracking-tight mb-3">
            3. Current Limitations
          </h2>
          <p className="text-muted-foreground leading-7 mb-3">
            We currently track the following limitations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Recipe images rely on third-party data and currently use recipe names for alt text,
              which may not always provide full visual context.
            </li>
            <li>
              Some dense recipe grids can be time-consuming to navigate with assistive technologies,
              especially when result counts are large.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="access-feedback">
          <h2 id="access-feedback" className="text-xl font-bold tracking-tight mb-3">
            4. Feedback and Contact
          </h2>
          <p className="text-muted-foreground leading-7">
            If you encounter an accessibility barrier, please contact us at{" "}
            <a
              href="mailto:accessibility@spoonbowl.app"
              className="underline hover:text-foreground transition-colors"
            >
              accessibility@spoonbowl.app
            </a>
            .
          </p>
        </section>

        <Separator />

        <section aria-labelledby="access-updates">
          <h2 id="access-updates" className="text-xl font-bold tracking-tight mb-3">
            5. Update Process
          </h2>
          <p className="text-muted-foreground leading-7">
            We use incoming accessibility feedback, issue reports, and routine UI updates to
            prioritize improvements. This statement is revised as implemented behavior changes.
          </p>
        </section>
      </div>
    </div>
  )
}
