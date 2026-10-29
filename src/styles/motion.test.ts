import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const css = readFileSync(new URL("./motion.css", import.meta.url), "utf8")
const layout = readFileSync(new URL("../layouts/BaseLayout.astro", import.meta.url), "utf8")

describe("page navigation motion", () => {
  // Cross-document view transitions jittered against the reveal entrances; plain MPA loads only.
  it("does not opt into cross-document view transitions", () => {
    expect(css).not.toMatch(/@view-transition/)
    expect(layout).not.toMatch(/view-transition|ClientRouter/)
  })
})
