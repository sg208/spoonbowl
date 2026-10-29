import { describe, expect, it } from "vitest"
import { filterRecipes, type SearchEntry } from "./filterRecipes"

const entry = (id: number, name: string, cuisine: string, tags: string[]): SearchEntry => ({
  id,
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  path: `/recipe/${id}/${name.toLowerCase().replace(/\s+/g, "-")}/`,
  cuisine,
  tags,
  mealType: ["Dinner"],
  difficulty: "Easy",
  image: "https://cdn.dummyjson.com/x.webp",
  totalMinutes: 30,
})

const index = [
  entry(1, "Classic Margherita Pizza", "Italian", ["Pizza", "Italian"]),
  entry(2, "Margarita Cocktail", "Mexican", ["Drink"]),
  entry(3, "Pad Thai", "Thai", ["Noodles"]),
  entry(4, "Pizza Bianca", "Italian", ["Pizza"]),
]

describe("filterRecipes", () => {
  it("returns [] for empty or whitespace queries", () => {
    expect(filterRecipes(index, "")).toEqual([])
    expect(filterRecipes(index, "   ")).toEqual([])
  })

  it("matches name, cuisine and tags case-insensitively", () => {
    expect(filterRecipes(index, "PAD").map((r) => r.id)).toEqual([3])
    expect(filterRecipes(index, "thai").map((r) => r.id)).toEqual([3])
    expect(filterRecipes(index, "noodle").map((r) => r.id)).toEqual([3])
    expect(filterRecipes(index, "drink").map((r) => r.id)).toEqual([2])
  })

  it("ranks name-prefix matches first, keeping index order within a rank", () => {
    expect(filterRecipes(index, "pizza").map((r) => r.id)).toEqual([4, 1])
  })

  it("caps results at the limit", () => {
    expect(filterRecipes(index, "i", 2)).toHaveLength(2)
    expect(filterRecipes(index, "i").length).toBeLessThanOrEqual(8)
  })

  it("returns [] when nothing matches", () => {
    expect(filterRecipes(index, "zzz")).toEqual([])
  })
})
