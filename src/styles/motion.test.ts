import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const css = readFileSync(new URL("./motion.css", import.meta.url), "utf8")

const getRuleBody = (selectorPattern: RegExp): string => {
  const match = css.match(new RegExp(`${selectorPattern.source}[^{]*\\{([^}]*)\\}`))
  return match?.[1] ?? ""
}

describe("motion.css cross-document view transition", () => {
  // The new page is captured on its first frame; hidden reveal start states would crossfade into a blank page.
  it("shows reveal targets at their end state while a view transition is active", () => {
    const body = getRuleBody(/:active-view-transition \[data-reveal\]/)

    expect(body).toMatch(/opacity:\s*1/)
    expect(body).toMatch(/transform:\s*none/)
    expect(body).toMatch(/transition:\s*none/)
  })

  it("opens shutter images while a view transition is active", () => {
    const body = getRuleBody(/:active-view-transition \.shutter > \*/)

    expect(body).toMatch(/clip-path:\s*inset\(0\)/)
    expect(body).toMatch(/transition:\s*none/)
  })

  // pagereveal fires before BaseLayout's end-of-body script, so a listener there never runs.
  it("marks on-screen targets entered by checking the live transition state, not pagereveal", () => {
    const layout = readFileSync(new URL("../layouts/BaseLayout.astro", import.meta.url), "utf8")

    expect(layout).toMatch(/\.matches\(":active-view-transition"\)/)
    expect(layout).not.toMatch(/addEventListener\("pagereveal"/)
  })
})
