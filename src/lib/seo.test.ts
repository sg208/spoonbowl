import { describe, expect, it } from "vitest"
import { formatPageTitle, formatRecipeTitle, toAbsoluteUrl } from "@/lib/seo"

describe("seo helpers", () => {
  it("wraps titles with the site name", () => {
    expect(formatPageTitle("Italian Cuisine")).toBe("Italian Cuisine | Spoonbowl")
    expect(formatRecipeTitle("Greek Spanakopita")).toBe("Greek Spanakopita Recipe | Spoonbowl")
  })

  it("builds absolute canonical urls on the site origin", () => {
    expect(toAbsoluteUrl("/recipes/tags/")).toBe("https://spoonbowl.gint.ing/recipes/tags/")
  })
})
