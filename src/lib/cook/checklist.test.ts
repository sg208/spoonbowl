import { describe, expect, it } from "vitest"
import { describeChecked, parseChecked } from "./checklist"

describe("parseChecked", () => {
  it("returns an empty list for missing or broken data", () => {
    expect(parseChecked(null)).toEqual([])
    expect(parseChecked("not json")).toEqual([])
    expect(parseChecked('{"a":1}')).toEqual([])
  })

  it("keeps only non-negative integers", () => {
    expect(parseChecked('[0, 2, -1, 1.5, "3", 4]')).toEqual([0, 2, 4])
  })
})

describe("describeChecked", () => {
  it("counts gathered ingredients", () => {
    expect(describeChecked(2, 6)).toBe("2 of 6 gathered")
  })

  it("says all gathered when every box is ticked", () => {
    expect(describeChecked(6, 6)).toBe("All gathered")
  })
})
