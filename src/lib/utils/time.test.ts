import { describe, expect, it } from "vitest"
import { totalMinutes } from "@/lib/utils/time"

describe("totalMinutes", () => {
  it("sums prep and cook minutes", () => {
    expect(totalMinutes({ prepTimeMinutes: 20, cookTimeMinutes: 15 })).toBe(35)
  })

  it("returns 0 when both are 0", () => {
    expect(totalMinutes({ prepTimeMinutes: 0, cookTimeMinutes: 0 })).toBe(0)
  })
})
