import { describe, expect, it } from "vitest"
import { FIXTURE_RECIPES } from "@/lib/__fixtures__/recipes"
import { buildCatalog } from "@/lib/catalog"
import { listingPaths, toIndexItems } from "@/lib/listing"

const { cuisines } = buildCatalog(FIXTURE_RECIPES)
const BASE_PATH = "/recipes/cuisine/"

describe("listingPaths", () => {
  const paths = listingPaths(cuisines, "cuisine", BASE_PATH)

  it("builds one path per group keyed by the param name", () => {
    expect(paths.map((path) => path.params)).toEqual([
      { cuisine: "asian" },
      { cuisine: "greek" },
      { cuisine: "italian" },
    ])
  })

  it("excludes the current group from siblings and keeps them image-free", () => {
    const italian = paths.find((path) => path.params.cuisine === "italian")
    expect(italian?.props.siblings).toEqual([
      { name: "Asian", href: "/recipes/cuisine/asian/", count: 1 },
      { name: "Greek", href: "/recipes/cuisine/greek/", count: 1 },
    ])
  })

  it("returns empty siblings for a single group", () => {
    const [only] = listingPaths(cuisines.slice(0, 1), "cuisine", BASE_PATH)
    expect(only?.props.siblings).toEqual([])
  })
})

describe("toIndexItems", () => {
  it("maps groups to index items using the first recipe image", () => {
    expect(toIndexItems(cuisines.slice(2), BASE_PATH)).toEqual([
      {
        name: "Italian",
        href: "/recipes/cuisine/italian/",
        count: 2,
        image: "https://cdn.dummyjson.com/recipe-images/1.webp",
      },
    ])
  })

  it("leaves image undefined for a group without recipes", () => {
    const [item] = toIndexItems([{ name: "Empty", slug: "empty", recipes: [] }], BASE_PATH)
    expect(item?.image).toBeUndefined()
  })
})
