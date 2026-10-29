export const MIN_SERVINGS = 1
export const MAX_SERVINGS = 12

const UNICODE_FRACTIONS: Record<string, number> = {
  "½": 1 / 2,
  "¼": 1 / 4,
  "¾": 3 / 4,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
}
const GLYPHS: ReadonlyArray<readonly [number, string]> = [
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [1 / 2, "½"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
]
const TOLERANCE = 0.04

const NUMBER = "(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+\\s*[½¼¾⅓⅔]|[½¼¾⅓⅔]|\\d+(?:\\.\\d+)?)"
const QUANTITY = new RegExp(`^\\s*(${NUMBER})(?:\\s*[-–]\\s*(${NUMBER}))?(?=\\s|$)`)

export const clampServings = (value: number): number =>
  Number.isFinite(value)
    ? Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, Math.round(value)))
    : MIN_SERVINGS

const parseNumber = (token: string): number => {
  const text = token.trim()
  const glyph = text.slice(-1)
  if (glyph in UNICODE_FRACTIONS) {
    const whole = Number.parseInt(text.slice(0, -1), 10)
    return (Number.isNaN(whole) ? 0 : whole) + (UNICODE_FRACTIONS[glyph] ?? 0)
  }
  const mixed = text.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3])
  const fraction = text.match(/^(\d+)\/(\d+)$/)
  if (fraction) return Number(fraction[1]) / Number(fraction[2])
  return Number(text)
}

const formatNumber = (value: number): string => {
  const whole = Math.floor(value)
  const rest = value - whole
  if (rest < TOLERANCE) return String(whole)
  if (1 - rest < TOLERANCE) return String(whole + 1)
  const glyph = GLYPHS.find(([target]) => Math.abs(rest - target) < TOLERANCE)?.[1]
  if (glyph) return `${whole > 0 ? whole : ""}${glyph}`
  return String(Math.round(value * 10) / 10)
}

export const hasQuantity = (text: string): boolean => QUANTITY.test(text)

export const scaleIngredient = (text: string, factor: number): string => {
  const match = text.match(QUANTITY)
  if (!match || !Number.isFinite(factor) || factor <= 0) return text
  const first = parseNumber(match[1] ?? "") * factor
  const second = match[2] ? parseNumber(match[2]) * factor : null
  if (!Number.isFinite(first) || (second !== null && !Number.isFinite(second))) return text
  const scaled =
    second === null ? formatNumber(first) : `${formatNumber(first)}-${formatNumber(second)}`
  return `${scaled}${text.slice(match[0].length)}`
}
