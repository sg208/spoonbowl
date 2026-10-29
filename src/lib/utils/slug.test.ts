import { describe, expect, it } from "vitest"
import {
  cuisineToSlug,
  difficultyToSlug,
  mealTypeToSlug,
  recipePath,
  slugify,
  tagToSlug,
} from "@/lib/utils/slug"
import { makeRecipe } from "@/lib/__fixtures__/recipes"

describe("slugify", () => {
  it("lowercases, strips punctuation, hyphenates whitespace", () => {
    expect(slugify("Chef's Pasta")).toBe("chefs-pasta")
    expect(slugify("Butter Chicken (Murgh Makhani)")).toBe("butter-chicken-murgh-makhani")
    expect(slugify("  Vegetarian Stir-Fry ")).toBe("vegetarian-stir-fry")
  })
})

describe("recipePath", () => {
  it("builds /recipe/<id>/<slug>/", () => {
    expect(recipePath(makeRecipe({ id: 38, name: "Greek Spanakopita" }))).toBe(
      "/recipe/38/greek-spanakopita/"
    )
  })
})

describe("listing slugs round-trip", () => {
  it("meal types with spaces", () => {
    expect(mealTypeToSlug("Side dish")).toBe("side-dish")
  })

  it("tags with hyphens", () => {
    expect(tagToSlug("Stir-fry")).toBe("stir-fry")
  })

  it("cuisines and difficulties", () => {
    expect(cuisineToSlug("Middle Eastern")).toBe("middle-eastern")
    expect(difficultyToSlug("Hard")).toBe("hard")
  })
})
