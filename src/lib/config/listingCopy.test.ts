import { describe, expect, it } from "vitest"
import { getMealTypeDescription, getTagDescription } from "@/lib/config/listingCopy"

describe("getTagDescription", () => {
  it("describes cuisine tags", () => {
    expect(getTagDescription("Italian")).toBe(
      "Explore delicious Italian recipes. From classic dishes to modern twists, find the best italian cooking inspiration."
    )
  })

  it("describes meal-type tags", () => {
    expect(getTagDescription("Side dish")).toBe(
      "Discover mouth-watering side dish recipes perfect for any occasion. Easy to follow and full of flavor."
    )
  })

  it("describes diet tags", () => {
    expect(getTagDescription("Vegan")).toBe(
      "Browse our collection of vegan recipes. Healthy, delicious, and easy to make at home."
    )
  })

  it("falls back for unknown tags", () => {
    expect(getTagDescription("Pizza")).toBe(
      "Explore our curated collection of pizza recipes. Find inspiration for your next meal with step-by-step instructions."
    )
  })
})

describe("getMealTypeDescription", () => {
  it("returns the curated copy for a known meal type", () => {
    expect(getMealTypeDescription("Dessert")).toBe(
      "Indulge your sweet tooth with these irresistible desserts and treats."
    )
  })

  it("falls back for an unknown meal type", () => {
    expect(getMealTypeDescription("Elevenses")).toBe(
      "Explore our collection of elevenses recipes. Find inspiration with step-by-step instructions."
    )
  })
})
