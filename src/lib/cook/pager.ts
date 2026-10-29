export interface PagerView {
  counter: string
  isFirst: boolean
  isLast: boolean
  nextLabel: string
}

// Position 0 is mise en place; 1..stepCount are the recipe steps.
export const describePosition = (position: number, stepCount: number): PagerView => {
  const isFirst = position <= 0
  const isLast = position >= stepCount
  return {
    counter: isFirst ? "Mise en place" : `Step ${position} of ${stepCount}`,
    isFirst,
    isLast,
    nextLabel: isLast ? "Done" : "Next",
  }
}
