const MEAL_TYPE_EMOJIS: Record<string, string> = {
  Breakfast: "🍳",
  Lunch: "🥪",
  Dinner: "🍴",
  Brunch: "🥞",
  Snack: "🥨",
  Dessert: "🍰",
  Appetizer: "🫙",
  "Side dish": "🥗",
  "Main course": "🍽️",
  "Street food": "🌮",
}

const MEAL_TYPE_DESCRIPTIONS: Record<string, string> = {
  Breakfast:
    "Start your day right with delicious breakfast recipes. From quick weekday options to leisurely weekend spreads.",
  Lunch:
    "Satisfying midday meals from hearty sandwiches to light salads. Perfect for the midday break.",
  Dinner: "End your day with a great meal. From weeknight staples to weekend showstoppers.",
  Brunch: "The best of both worlds. Enjoy these leisurely late-morning recipes on weekends.",
  Snack: "Quick bites and nibbles for any time of day. Perfect between meals.",
  Dessert: "Indulge your sweet tooth with these irresistible desserts and treats.",
  Appetizer: "Kick off your meal with these crowd-pleasing starters and small bites.",
  "Side dish": "The perfect accompaniments to elevate any main course.",
  "Main course": "Satisfying centerpiece dishes that make a complete, hearty meal.",
  "Street food": "Bold, vibrant flavors from markets and food stalls around the world.",
}

export const mealTypeToSlug = (mealType: string): string => {
  return mealType.toLowerCase().replace(/\s+/g, "-")
}

export const slugToMealType = (slug: string, allTypes?: string[]): string => {
  if (allTypes) {
    const match = allTypes.find((t) => mealTypeToSlug(t) === slug)
    if (match) return match
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const getMealTypeEmoji = (mealType: string): string => {
  return MEAL_TYPE_EMOJIS[mealType] ?? "🍴"
}

export const getMealTypeDescription = (mealType: string): string => {
  return (
    MEAL_TYPE_DESCRIPTIONS[mealType] ??
    `Explore our collection of ${mealType.toLowerCase()} recipes. Find inspiration with step-by-step instructions.`
  )
}

export const mealTypeToPageTitle = (mealType: string): string => {
  return `${mealType} Recipes`
}
