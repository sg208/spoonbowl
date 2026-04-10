const MEAL_TYPES = new Set([
  "Breakfast", "Lunch", "Dinner", "Brunch", "Snack", "Dessert",
  "Appetizer", "Side dish", "Main course", "Street food",
])

const CUISINES = new Set([
  "Italian", "Mexican", "Chinese", "Japanese", "Indian", "Mediterranean",
  "Thai", "French", "Greek", "Korean", "Pakistani", "Moroccan", "American",
  "Turkish", "Vietnamese", "Lebanese", "Spanish", "Middle Eastern", "Asian",
])

const DIET_TYPES = new Set([
  "Vegetarian", "Vegan", "Gluten-free", "Keto", "Paleo", "Low-carb",
  "Dairy-free", "Nut-free",
])

const DISH_TYPES = new Set([
  "Pizza", "Pasta", "Soup", "Salad", "Stir-fry", "Curry", "Biryani",
  "Rice", "Ramen", "Lasagna", "Tacos", "Burger", "Sandwich",
  "Cookies", "Cake", "Bread", "Smoothie",
])

export const tagToPageTitle = (tag: string): string => {
  if (MEAL_TYPES.has(tag)) return `${tag} Recipes`
  if (CUISINES.has(tag)) return `${tag} Recipes`
  if (DIET_TYPES.has(tag)) return `${tag} Recipes`
  if (DISH_TYPES.has(tag)) return `${tag} Recipes`
  return `${tag} Recipes`
}

export const tagToDescription = (tag: string): string => {
  if (CUISINES.has(tag)) {
    return `Explore delicious ${tag} recipes. From classic dishes to modern twists, find the best ${tag.toLowerCase()} cooking inspiration.`
  }
  if (MEAL_TYPES.has(tag)) {
    return `Discover mouth-watering ${tag.toLowerCase()} recipes perfect for any occasion. Easy to follow and full of flavor.`
  }
  if (DIET_TYPES.has(tag)) {
    return `Browse our collection of ${tag.toLowerCase()} recipes. Healthy, delicious, and easy to make at home.`
  }
  return `Explore our curated collection of ${tag.toLowerCase()} recipes. Find inspiration for your next meal with step-by-step instructions.`
}

export const tagToSlug = (tag: string): string => {
  return tag.toLowerCase().replace(/\s+/g, "-")
}

export const slugToTag = (slug: string, allTags?: string[]): string => {
  if (allTags) {
    const match = allTags.find((t) => tagToSlug(t) === slug)
    if (match) return match
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const sortTagsAlphabetically = (tags: string[]): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {}
  for (const tag of tags) {
    const letter = tag[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(tag)
  }
  return grouped
}

const TAG_ICONS: Record<string, string> = {
  Pizza: "🍕",
  Italian: "🇮🇹",
  Vegetarian: "🥗",
  "Stir-fry": "🥢",
  Asian: "🍜",
  Cookies: "🍪",
  Dessert: "🍰",
  Baking: "🧁",
  Pasta: "🍝",
  Chicken: "🍗",
  Salsa: "🌶️",
  Salad: "🥙",
  Quinoa: "🌾",
  Beef: "🥩",
  Shrimp: "🦐",
  Biryani: "🍚",
  "Main course": "🍽️",
  Indian: "🫓",
  Pakistani: "🍛",
  Korean: "🥘",
  Rice: "🍚",
  Greek: "🫒",
  Curry: "🍛",
  Thai: "🌿",
  Tiramisu: "☕",
  Turkish: "🧆",
  Grilling: "🔥",
  Smoothie: "🥤",
  Mexican: "🌮",
  Japanese: "🍱",
  Moroccan: "🏺",
  Soup: "🍲",
  Breakfast: "🍳",
  Lunch: "🥪",
  Dinner: "🍴",
  Snack: "🥨",
  Mango: "🥭",
  Banana: "🍌",
  Blueberry: "🫐",
}

export const getTagEmoji = (tag: string): string => {
  return TAG_ICONS[tag] ?? "🍴"
}
