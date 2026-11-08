import { describe, expect, it } from "vitest"
import {
  getCuisineDescription,
  getDifficultyDescription,
  getMealTypeDescription,
  getTagDescription,
} from "@/lib/config/listingCopy"

describe("getTagDescription", () => {
  it("describes cuisine tags", () => {
    expect(getTagDescription("Italian")).toBe(
      "Italian dishes, with the ingredients and steps for each."
    )
  })

  it("describes meal-type tags", () => {
    expect(getTagDescription("Side dish")).toBe("Side dish recipes you can cook from.")
  })

  it("describes diet tags", () => {
    expect(getTagDescription("Vegan")).toBe("Vegan recipes, each with its full ingredient list.")
  })

  it("falls back for unknown tags", () => {
    expect(getTagDescription("Pizza")).toBe("Recipes tagged pizza.")
  })
})

describe("getMealTypeDescription", () => {
  it("returns the written copy for a known meal type", () => {
    expect(getMealTypeDescription("Dessert")).toBe(
      "Cakes, puddings and other things with sugar in them."
    )
  })

  it("falls back for an unknown meal type", () => {
    expect(getMealTypeDescription("Elevenses")).toBe(
      "Elevenses recipes, with the ingredients and steps for each."
    )
  })
})

describe("listing copy voice", () => {
  const MARKETING_WORDS =
    /discover|delicious|indulge|irresistible|elevate|curated|perfect|inspiration|—/i
  const samples = [
    ...[
      "Italian",
      "Asian",
      "Mexican",
      "Mediterranean",
      "Japanese",
      "Indian",
      "Thai",
      "Klingon",
    ].map(getCuisineDescription),
    ...["Easy", "Medium", "Hard", "Legendary"].map(getDifficultyDescription),
    ...[
      "Breakfast",
      "Lunch",
      "Dinner",
      "Brunch",
      "Snack",
      "Dessert",
      "Appetizer",
      "Side dish",
      "Main course",
      "Street food",
      "Elevenses",
    ].map(getMealTypeDescription),
    ...["Italian", "Side dish", "Vegan", "Pizza"].map(getTagDescription),
  ]

  it.each(samples)("reads plainly: %s", (description) => {
    expect(description).not.toMatch(MARKETING_WORDS)
  })
})
