import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { FIXTURE_RECIPES, toResponse } from "@/lib/__fixtures__/recipes"

const loadCatalogModule = async () => {
  vi.resetModules()
  return import("@/lib/catalog")
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, json: async () => toResponse(FIXTURE_RECIPES) }) as Response)
  )
})
afterEach(() => vi.unstubAllGlobals())

describe("getCatalog", () => {
  it("fetches once across 5 calls", async () => {
    const { getCatalog } = await loadCatalogModule()
    await Promise.all([getCatalog(), getCatalog(), getCatalog()])
    await getCatalog()
    await getCatalog()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it("groups cuisines with slugs, counts and sorted names", async () => {
    const { getCatalog } = await loadCatalogModule()
    const { cuisines } = await getCatalog()
    expect(cuisines.map((c) => [c.name, c.slug, c.recipes.length])).toEqual([
      ["Asian", "asian", 1],
      ["Greek", "greek", 1],
      ["Italian", "italian", 2],
    ])
  })

  it("groups tags and meal types by recipe, deduped", async () => {
    const { getCatalog } = await loadCatalogModule()
    const { tags, mealTypes } = await getCatalog()
    expect(tags.find((t) => t.name === "Italian")?.recipes.map((r) => r.id)).toEqual([1, 4])
    expect(tags.find((t) => t.name === "Butter chicken")?.slug).toBe("butter-chicken")
    expect(mealTypes.map((m) => m.slug)).toEqual(["appetizer", "dinner", "lunch", "side-dish"])
    expect(mealTypes.find((m) => m.slug === "side-dish")?.recipes).toHaveLength(2)
  })

  it("orders difficulties Easy, Medium, Hard", async () => {
    const { getCatalog } = await loadCatalogModule()
    const { difficulties } = await getCatalog()
    expect(difficulties.map((d) => d.name)).toEqual(["Easy", "Medium", "Hard"])
  })

  it("exposes featured recipe 38 and lookup by id", async () => {
    const { getCatalog } = await loadCatalogModule()
    const catalog = await getCatalog()
    expect(catalog.featured.name).toBe("Greek Spanakopita")
    expect(catalog.byId.get(4)?.name).toBe("Chef's Pasta")
  })

  it("rejects when the network call fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false }) as Response)
    )
    const { getCatalog } = await loadCatalogModule()
    await expect(getCatalog()).rejects.toThrow()
  })
})
