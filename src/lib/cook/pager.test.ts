import { describe, expect, it } from "vitest"
import { describePosition } from "./pager"

describe("describePosition", () => {
  it("starts at mise en place with Prev disabled", () => {
    expect(describePosition(0, 7)).toEqual({
      counter: "Mise en place",
      isFirst: true,
      isLast: false,
      nextLabel: "Next",
    })
  })
  it("counts steps from 1", () => {
    expect(describePosition(2, 7).counter).toBe("Step 2 of 7")
  })
  it("turns Next into Done on the last step", () => {
    expect(describePosition(7, 7)).toMatchObject({
      isLast: true,
      nextLabel: "Done",
      isFirst: false,
    })
  })
})
