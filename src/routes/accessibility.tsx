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
          <Badge className="bg-accent text-accent-foreground">Level AA</Badge>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Accessibility Statement
        </h1>
        <p className="mt-3 text-muted-foreground">Last updated: April 10, 2026</p>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-labelledby="access-commitment">
          <h2 id="access-commitment" className="text-xl font-bold tracking-tight mb-3">
            Our Commitment
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is committed to making its website accessible to all users, including those
            with disabilities. We aim to comply with the Web Content Accessibility Guidelines (WCAG)
            2.1 and 2.2 at Level AA, issued by the World Wide Web Consortium (W3C).
          </p>
        </section>

        <Separator />

        <section aria-labelledby="access-status">
          <h2 id="access-status" className="text-xl font-bold tracking-tight mb-3">
            Conformance Status
          </h2>
          <p className="text-muted-foreground leading-7">
            Spoonbowl is <strong>partially conformant</strong> with WCAG 2.1 and 2.2 Level AA.
            Partial conformance means that some parts of the content do not fully conform to all the
            accessibility standard requirements. We are actively working to achieve full
            conformance.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="access-features">
          <h2 id="access-features" className="text-xl font-bold tracking-tight mb-3">
            Accessibility Features
          </h2>
          <p className="text-muted-foreground leading-7 mb-4">
            We have implemented the following accessibility features:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Semantic HTML</strong>: Proper use of HTML5 landmark elements (
              <code className="text-xs bg-muted px-1 py-0.5 rounded">header</code>,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">nav</code>,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">main</code>,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">footer</code>,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">section</code>,{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">article</code>).
            </li>
            <li>
              <strong>Keyboard Navigation</strong>: All interactive elements are reachable and
              operable using a keyboard alone.
            </li>
            <li>
              <strong>Focus Indicators</strong>: Visible focus outlines are provided for all
              interactive elements to assist keyboard users.
            </li>
            <li>
              <strong>ARIA Labels</strong>: Descriptive ARIA labels and roles are applied where
              native HTML semantics are insufficient.
            </li>
            <li>
              <strong>Alt Text</strong>: All meaningful images include descriptive alternative text.
              Decorative images use empty alt attributes.
            </li>
            <li>
              <strong>Color Contrast</strong>: Primary text and interactive components are styled to
              meet WCAG 2.1 AA contrast targets (4.5:1 for normal text, 3:1 for large text). We
              review theme tokens periodically; report contrast issues if you encounter them.
            </li>
            <li>
              <strong>Resizable Text</strong>: Text can be resized up to 200% without loss of
              content or functionality.
            </li>
            <li>
              <strong>Responsive Design</strong>: The website adapts to various screen sizes and
              orientations.
            </li>
            <li>
              <strong>Dark Mode</strong>: A high-contrast dark mode is available to reduce eye
              strain.
            </li>
            <li>
              <strong>Skip Link</strong>: A &quot;Skip to main content&quot; link is available as
              the first focusable control in the page header so keyboard users can bypass repeated
              navigation.
            </li>
            <li>
              <strong>ARIA Live Regions</strong>: Where content updates dynamically (for example,
              the recipe count on the home page), we use polite live regions so assistive
              technologies can announce changes.
            </li>
            <li>
              <strong>Loading States</strong>: Screen readers are informed when content is loading
              via
              <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-busy</code> attributes.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="access-limitations">
          <h2 id="access-limitations" className="text-xl font-bold tracking-tight mb-3">
            Known Limitations
          </h2>
          <p className="text-muted-foreground leading-7 mb-3">
            Despite our efforts, the following known accessibility limitations exist:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Some third-party recipe images from DummyJSON may not have optimally descriptive alt
              text beyond the recipe name. We supplement with the recipe name where the content
              provider does not supply descriptions.
            </li>
            <li>
              The recipe card grid layout may present navigation challenges for screen reader users
              with very large numbers of results. We provide count information to help orient users.
            </li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="access-tech">
          <h2 id="access-tech" className="text-xl font-bold tracking-tight mb-3">
            Technical Specifications
          </h2>
          <p className="text-muted-foreground leading-7 mb-3">
            The accessibility of Spoonbowl relies on the following technologies:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>HTML5</li>
            <li>CSS (including media queries and custom properties)</li>
            <li>WAI-ARIA 1.2</li>
            <li>React 19 (component-based architecture)</li>
            <li>Radix UI primitives (accessible headless components)</li>
          </ul>
          <h3 className="font-semibold mt-5 mb-2">Browser Compatibility</h3>
          <p className="text-muted-foreground leading-7">
            We support the latest two versions of major browsers: Chrome, Firefox, Safari, Edge.
            Mobile browsers on iOS and Android are also supported.
          </p>
          <h3 className="font-semibold mt-5 mb-2">Assistive Technology</h3>
          <p className="text-muted-foreground leading-7">
            We test with the following assistive technologies:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
            <li>VoiceOver (macOS and iOS)</li>
            <li>NVDA (Windows)</li>
            <li>TalkBack (Android)</li>
            <li>Keyboard-only navigation</li>
          </ul>
        </section>

        <Separator />

        <section aria-labelledby="access-feedback">
          <h2 id="access-feedback" className="text-xl font-bold tracking-tight mb-3">
            Feedback &amp; Contact
          </h2>
          <p className="text-muted-foreground leading-7">
            We welcome feedback on the accessibility of Spoonbowl. If you experience any barriers or
            have suggestions for improvement, please contact us:
          </p>
          <div className="mt-3 rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:accessibility@spoonbowl.app"
                className="underline hover:text-foreground transition-colors"
              >
                accessibility@spoonbowl.app
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We aim to respond to accessibility feedback within 5 business days.
            </p>
          </div>
        </section>

        <Separator />

        <section aria-labelledby="access-enforcement">
          <h2 id="access-enforcement" className="text-xl font-bold tracking-tight mb-3">
            Enforcement Procedure
          </h2>
          <p className="text-muted-foreground leading-7">
            If you are not satisfied with our response to your accessibility concerns, you may
            contact relevant enforcement bodies in your jurisdiction. In the EU, you may contact
            your national disability authority or equal treatment body.
          </p>
        </section>
      </div>
    </div>
  )
}
