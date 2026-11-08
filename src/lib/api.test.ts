import { afterEach, describe, expect, it, vi } from "vitest"
import { fetchAllRecipes, RecipeSchema } from "@/lib/api"
import { FIXTURE_RECIPES, makeRecipe, toResponse } from "@/lib/__fixtures__/recipes"

const stubFetch = (body: unknown, isOk = true) => {
  const status = isOk ? 200 : 503
  const fetchMock = vi.fn(async () => ({ ok: isOk, status, json: async () => body }) as Response)
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

afterEach(() => vi.unstubAllGlobals())

describe("RecipeSchema", () => {
  it("accepts a well-formed recipe", () => {
    expect(RecipeSchema.parse(makeRecipe()).name).toBe("Classic Margherita Pizza")
  })

  it("rejects an unknown difficulty", () => {
    expect(() => RecipeSchema.parse({ ...makeRecipe(), difficulty: "Brutal" })).toThrow()
  })
})

describe("fetchAllRecipes", () => {
  it("fetches limit=0 once and returns parsed recipes", async () => {
    const fetchMock = stubFetch(toResponse(FIXTURE_RECIPES))
    const recipes = await fetchAllRecipes()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes?limit=0",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    )
    expect(recipes).toHaveLength(4)
  })

  it("throws on a non-OK response", async () => {
    stubFetch({}, false)
    await expect(fetchAllRecipes()).rejects.toThrow("Failed to fetch recipes: HTTP 503")
  })

  it("throws on a malformed payload", async () => {
    stubFetch({ recipes: [{ id: "nope" }] })
    await expect(fetchAllRecipes()).rejects.toThrow()
  })
})
