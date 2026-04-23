import { useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
})

const DisclaimerPage = () => {
  useEffect(() => {
    document.title = "Disclaimer – Spoonbowl"
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Disclaimer
        </h1>
      </header>

      <div className="space-y-8 text-foreground">
        <section aria-label="Introduction">
          <p className="text-muted-foreground leading-7">
            Spoonbowl provides recipe discovery for general information and inspiration. The
            following limitations apply to all content on this site.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="disclaimer-untested">
          <h2 id="disclaimer-untested" className="text-xl font-bold tracking-tight mb-3">
            Recipes may not be tested
          </h2>
          <p className="text-muted-foreground leading-7">
            Recipe content is sourced from third-party data and may not have been tested or verified
            by Spoonbowl. Ingredient lists, instructions, timing, yields, and results may vary. Use
            your own judgment when cooking or baking.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="disclaimer-safety">
          <h2 id="disclaimer-safety" className="text-xl font-bold tracking-tight mb-3">
            Food safety and preparation
          </h2>
          <p className="text-muted-foreground leading-7">
            You are solely responsible for safe food handling, including cooking temperatures,
            cross-contamination, storage, and allergen management. Spoonbowl does not guarantee that
            any recipe is safe or appropriate for your situation.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="disclaimer-dietary">
          <h2 id="disclaimer-dietary" className="text-xl font-bold tracking-tight mb-3">
            Dietary labels and tags
          </h2>
          <p className="text-muted-foreground leading-7">
            Tags, categories, and similar labels (for example meal type, cuisine, or terms that may
            suggest a dietary pattern) are provided for organization and browsing only. They are{" "}
            <strong>not</strong> medical, nutritional, or dietary claims, have not been clinically
            validated or proven for any health outcome, and may not meet strict dietary standards
            for specific conditions. Always verify ingredients and suitability with your own
            requirements.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="disclaimer-medical">
          <h2 id="disclaimer-medical" className="text-xl font-bold tracking-tight mb-3">
            Not medical or professional advice
          </h2>
          <p className="text-muted-foreground leading-7">
            Nothing on Spoonbowl is intended as medical, nutrition, or therapeutic advice. For
            questions about allergies, intolerances, chronic conditions, or special diets, consult a
            qualified healthcare or nutrition professional.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="disclaimer-liability">
          <h2 id="disclaimer-liability" className="text-xl font-bold tracking-tight mb-3">
            Limitation of liability
          </h2>
          <p className="text-muted-foreground leading-7">
            To the fullest extent permitted by applicable law, Spoonbowl and its operators are not
            liable for any loss or damage arising from your use of recipe content or reliance on any
            information on this site. Your use is at your own risk.
          </p>
        </section>

        <Separator />

        <section aria-labelledby="disclaimer-availability">
          <h2 id="disclaimer-availability" className="text-xl font-bold tracking-tight mb-3">
            Site availability
          </h2>
          <p className="text-muted-foreground leading-7">
            The site is delivered using infrastructure providers (for example{" "}
            <strong>Cloudflare</strong> for DNS and network services and <strong>Railway</strong>{" "}
            for hosting). Interruptions, regional differences in delivery, or temporary
            unavailability may occur and are outside Spoonbowl&apos;s control.
          </p>
        </section>
      </div>
    </div>
  )
}
