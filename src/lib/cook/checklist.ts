// Stored ticks are untrusted (another tab, an old version): keep only non-negative integers.
export const parseChecked = (raw: string | null): number[] => {
  if (!raw) return []
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value.filter((item): item is number => Number.isInteger(item) && item >= 0)
  } catch {
    return []
  }
}

export const describeChecked = (checkedCount: number, total: number): string =>
  checkedCount >= total && total > 0 ? "All gathered" : `${checkedCount} of ${total} gathered`
