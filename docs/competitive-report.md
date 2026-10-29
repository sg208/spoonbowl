# Spoonbowl competitive report

- **Date**: 2026-10-29
- **Status**: input to the Astro redesign (`feat/astro-redesign`). Target audience still **open**. See §3.

## 1. Competitors and reference sites

| Site                              | Positioning / audience                              | Notable UX patterns                                                                                                                                                                                                                                             | Weakness Spoonbowl could exploit                                                                                                                                             |
| --------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NYT Cooking**                   | Premium editorial, paid add-on; affluent home cooks | Recipe Box with folders, built-in grocery list, community notes, steps highlight as you finish them ([help center](https://thenewyorktimeshelpcenter.helpjuice.com/19686556670868-Cooking-Recipe-Features), [Pratt critique](https://ixd.prattsi.org/?p=33713)) | Paywall (aggregator lists about $4.99–5.99/mo, $54.99/yr; unverified, see [Adapty](https://adapty.io/paywall-library/nyt-cooking/)). Grocery list is hard to find in the nav |
| **Serious Eats**                  | Science-led technique; enthusiasts                  | Long-form explainers, step photos                                                                                                                                                                                                                               | Long pages, though it does well on speed: 91% "good" Core Web Vitals ([DebugBear](https://www.debugbear.com/blog/media-publisher-web-performance-recipe-food-sites))         |
| **Bon Appétit**                   | Lifestyle and editorial brand; younger foodies      | Strong photography and video                                                                                                                                                                                                                                    | Ads cause layout shift, used as the example in the [DebugBear study](https://www.debugbear.com/blog/media-publisher-web-performance-recipe-food-sites)                       |
| **Budget Bytes**                  | Cheap, simple meals; budget cooks                   | Cost per recipe and per serving on the card ([NPR](https://www.npr.org/2023/05/24/1177920731/save-money-on-groceries))                                                                                                                                          | Ad-heavy WordPress blog. Prices go stale                                                                                                                                     |
| **Mob**                           | UK students and young adults; feeds 4 for under £10 | Bold, punchy visuals; the app has step-by-step cook mode and shopping lists ([mob.co.uk](https://mob.co.uk/recipes/collections/student-recipes))                                                                                                                | Best features are app-only or Premium                                                                                                                                        |
| **Just the Recipe / Cooked.wiki** | "Strip the fluff" tools                             | Prefix a URL to get a clean card, plus print or PDF ([Cooked.wiki note](https://help.nextcloud.com/t/just-wanted-to-let-you-know-about-https-cooked-wiki-for-cleaning-up-recipes/179312), [JTR App Store](https://apps.apple.com/app/id1598423213))             | Just a utility: no browsing, no design, depends on other sites                                                                                                               |
| **Paprika**                       | Personal recipe manager; organized cooks            | Detects timers from step text, keeps screen awake, scales recipes ([App Store](https://apps.apple.com/us/app/-/id1303222868), [Cool Tools](https://kk.org/cooltools/?p=27367))                                                                                  | Paid separately per platform. No discovery. Dated UI                                                                                                                         |
| **Samsung Food (ex-Whisk)**       | Meal planning and lists at scale                    | Import from any site, plans that turn into lists, AI plans in a paid tier ([App Store](https://apps.apple.com/us/app/-/id1133637674))                                                                                                                           | Sends you back to the original site for instructions. Account-gated and cluttered                                                                                            |

The pain points are well documented: readers resent life-story preambles, ads, and broken "jump to recipe" buttons ([Lemmy thread](https://lemmy.mariusdavid.fr/post/422298), [Straight Dope](https://boards.straightdope.com/t/recipes-on-line/1030826)). A whole category of extensions exists just to skip them, such as [Recipe Cleaner](https://chromewebstore.google.com/detail/folihnohmpkdhncmmopakfplpmjljaam).

## 2. Market gaps that fit Spoonbowl's constraints

- **Instant, clean, ad-free pages for free.** Cleaner tools prove the demand, but nobody offers a well-designed browsing experience built that way. Static Astro ships near-zero JS and keeps layout shift at zero.
- **Cook mode on the web with no install or account.** Competitors keep cook features inside apps or behind a paywall. Screen Wake Lock works in every major browser, including Safari 16.4+ ([web.dev](https://web.dev/blog/screen-wake-lock-supported-in-all-browsers)).
- **Offline-first that really works.** About 50 recipes are small enough to precache the whole catalog.
- **Glanceable data.** DummyJSON already has prep and cook time, difficulty, calories, servings and mealType.
- **Limits to accept:** 50 recipes can't compete on catalog depth, and there's no cost data. With no accounts, any per-user state lives in localStorage. Ratings are synthetic, so play them down.

## 3. Spin-off positionings

**A. "No-nonsense fast recipe reader."** For people fed up with ad-heavy blogs. The recipe is the first thing on screen. Risk: once speed is matched, 50 fixed recipes leave little reason to stay.

**B. "Cook-mode-first offline kitchen companion."** For home cooks with a phone or tablet at the counter. Prop it up and cook. Large type, one step at a time, timers, checklists, servings scaler, works offline with the screen kept on. Turns the small dataset into a strength.

**C. "Astro static + PWA showcase."** For developers, designers and hiring managers. Shows off performance, view transitions, offline and accessibility. Risk: no end-user reason to come back. Fine as a secondary layer.

**Recommendation: B, with C as the secondary "demo" layer.** Every constraint becomes an advantage: static means instant, a fixed set can be precached, no accounts means no friction. B also covers A.

**Target audience: open.** Candidates:

| Candidate                           | Would push the design toward                                       |
| ----------------------------------- | ------------------------------------------------------------------ |
| Beginner home cooks                 | More guidance, glossary, gentler copy, difficulty front and centre |
| Students / budget cooks             | Short times, few ingredients, punchier tone (Mob territory)        |
| General weeknight cooks             | Current balance: browse by cuisine/meal type, quick filters        |
| Developers / hiring managers (demo) | "How it's built" layer, performance numbers visible                |

The redesign ships for **general weeknight cooks**, which keeps the current IA unchanged. Pick the audience before the next copy pass.

## 4. Design direction cues for B

- **Typography:** a legible sans for steps; cook-mode steps around 24–32px, line-height ≥ 1.5.
- **Density:** browse is a compact grid with time / difficulty / kcal; cook is very sparse, one step per screen.
- **Imagery:** one hero per recipe; in cook mode the text wins. Fixed aspect ratios, no layout shift.
- **Cook-mode features:** wake lock (re-acquired on `visibilitychange`), ingredient checkboxes, step pager with keyboard and ≥48px Prev/Next, servings scaler, mise en place before step 1.
- **Trust signals:** total time up front, no preamble, no ads as an explicit promise, synthetic ratings de-emphasised.
- **Accessibility:** follow reduced-motion, keep focus visible in cook mode, never rely on color alone.
