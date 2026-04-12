const CUISINE_EMOJIS: Record<string, string> = {
  Italian: "🇮🇹",
  Asian: "🥢",
  American: "🍔",
  Mexican: "🌮",
  Mediterranean: "🫒",
  Japanese: "🍜",
  Pakistani: "🍛",
  Indian: "🍛",
  Moroccan: "🥘",
  Korean: "🍚",
  Greek: "🫓",
  Thai: "🌶️",
  Turkish: "🥙",
  Russian: "🥣",
  Lebanese: "🥙",
  Spanish: "🥔",
  Vietnamese: "🍲",
  Brazilian: "🍹",
  Hawaiian: "🍍",
  Cocktail: "🍹",
  Smoothie: "🥤",
}

const CUISINE_DESCRIPTIONS: Record<string, string> = {
  Italian: "From rustic pasta to wood-fired pizza — explore classic and modern Italian cooking.",
  Asian: "Stir-fries, noodles, and bold flavors spanning East and Southeast Asian kitchens.",
  Mexican: "Tacos, salsas, and comfort food with chiles, lime, and fresh herbs.",
  Mediterranean: "Sun-kissed flavors: olive oil, herbs, grains, and fresh vegetables.",
  Japanese: "Ramen, teriyaki, and delicate balance — precision and comfort in every bowl.",
  Indian: "Aromatics, spices, and regional dishes from dosa to curries.",
  Thai: "Sweet, sour, salty, and spicy — curries, noodles, and street-food energy.",
}

export const cuisineToSlug = (cuisine: string): string => {
  return cuisine.toLowerCase().replace(/\s+/g, "-")
}

export const slugToCuisine = (slug: string, allCuisines?: string[]): string => {
  if (allCuisines) {
    const match = allCuisines.find((c) => cuisineToSlug(c) === slug)
    if (match) return match
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const getCuisineEmoji = (cuisine: string): string => {
  return CUISINE_EMOJIS[cuisine] ?? "🌍"
}

export const getCuisineDescription = (cuisine: string): string => {
  return (
    CUISINE_DESCRIPTIONS[cuisine] ??
    `Discover ${cuisine} recipes from our collection — full ingredients, instructions, and nutrition info.`
  )
}

export const cuisineToPageTitle = (cuisine: string): string => {
  return `${cuisine} Recipes`
}
