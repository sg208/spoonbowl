export interface SearchEntry {
  id: number
  name: string
  slug: string
  path: string
  cuisine: string
  tags: string[]
  mealType: string[]
  difficulty: string
  image: string
  totalMinutes: number
}

export const DEFAULT_LIMIT = 8

export const filterRecipes = (
  index: SearchEntry[],
  query: string,
  limit = DEFAULT_LIMIT
): SearchEntry[] => {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  const prefixMatches: SearchEntry[] = []
  const otherMatches: SearchEntry[] = []
  for (const entry of index) {
    const name = entry.name.toLowerCase()
    if (name.startsWith(needle)) prefixMatches.push(entry)
    else if (
      name.includes(needle) ||
      entry.cuisine.toLowerCase().includes(needle) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(needle))
    )
      otherMatches.push(entry)
  }
  return [...prefixMatches, ...otherMatches].slice(0, limit)
}
