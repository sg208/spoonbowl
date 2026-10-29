// Measured 2026-10-29 against https://dummyjson.com/recipes?limit=0:
// 50 recipes, 417 ingredient strings, 0 start with a numeric/fraction quantity.
// The scaler is kept for correctness; the UI shows an honest "no amounts" note.
import { describe, expect, it } from "vitest"
import { MAX_SERVINGS, MIN_SERVINGS, clampServings, hasQuantity, scaleIngredient } from "./scale"

describe("scaleIngredient", () => {
  it("scales whole numbers", () => {
    expect(scaleIngredient("2 cups flour", 2)).toBe("4 cups flour")
  })
  it("scales simple fractions", () => {
    expect(scaleIngredient("1/2 tsp salt", 2)).toBe("1 tsp salt")
    expect(scaleIngredient("1/2 tsp salt", 0.5)).toBe("¼ tsp salt")
  })
  it("scales mixed numbers", () => {
    expect(scaleIngredient("1 1/2 lb beef", 2)).toBe("3 lb beef")
    expect(scaleIngredient("1 1/2 lb beef", 1)).toBe("1½ lb beef")
  })
  it("scales unicode fractions", () => {
    expect(scaleIngredient("½ cup milk", 3)).toBe("1½ cup milk")
    expect(scaleIngredient("1½ cup milk", 2)).toBe("3 cup milk")
  })
  it("scales ranges", () => {
    expect(scaleIngredient("2-3 cloves garlic", 2)).toBe("4-6 cloves garlic")
  })
  it("formats thirds and falls back to one decimal", () => {
    expect(scaleIngredient("1 cup rice", 4 / 3)).toBe("1⅓ cup rice")
    expect(scaleIngredient("1 cup rice", 1.14)).toBe("1.1 cup rice")
  })
  it("leaves strings without a quantity unchanged", () => {
    expect(scaleIngredient("Salt and pepper to taste", 3)).toBe("Salt and pepper to taste")
    expect(scaleIngredient("", 3)).toBe("")
  })
  it("never yields NaN or Infinity", () => {
    const out = scaleIngredient("1/0 cup odd", 2)
    expect(out).not.toMatch(/NaN|Infinity/)
    expect(scaleIngredient("2 cups flour", Number.NaN)).toBe("2 cups flour")
  })
})

describe("hasQuantity", () => {
  it("detects leading quantities only", () => {
    expect(hasQuantity("2 cups flour")).toBe(true)
    expect(hasQuantity("½ cup milk")).toBe(true)
    expect(hasQuantity("Eggs")).toBe(false)
  })
})

describe("clampServings", () => {
  it("keeps servings within 1..12", () => {
    expect(MIN_SERVINGS).toBe(1)
    expect(MAX_SERVINGS).toBe(12)
    expect(clampServings(0)).toBe(1)
    expect(clampServings(13)).toBe(12)
    expect(clampServings(4)).toBe(4)
    expect(clampServings(Number.NaN)).toBe(1)
  })
})
