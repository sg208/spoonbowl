const DIFFICULTY_EMOJIS: Record<string, string> = {
  Easy: "🟢",
  Medium: "🟡",
  Hard: "🔴",
}

const DIFFICULTY_DESCRIPTIONS: Record<string, string> = {
  Easy: "Perfect for beginners — quick prep, simple techniques, and forgiving recipes you can rely on.",
  Medium: "A step up in skill and time. Great for home cooks looking to expand their repertoire.",
  Hard: "For the ambitious cook — complex techniques, longer prep, and rewarding results.",
}

export const difficultyToSlug = (difficulty: string): string => {
  return difficulty.toLowerCase()
}

export const slugToDifficulty = (slug: string, allDifficulties?: string[]): string => {
  if (allDifficulties) {
    const match = allDifficulties.find((d) => difficultyToSlug(d) === slug)
    if (match) return match
  }
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}

export const getDifficultyEmoji = (difficulty: string): string => {
  return DIFFICULTY_EMOJIS[difficulty] ?? "🍴"
}

export const getDifficultyDescription = (difficulty: string): string => {
  return (
    DIFFICULTY_DESCRIPTIONS[difficulty] ??
    `Explore our collection of ${difficulty.toLowerCase()} recipes with full ingredients and instructions.`
  )
}

export const difficultyToPageTitle = (difficulty: string): string => {
  return `${difficulty} Recipes`
}
