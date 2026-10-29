const CUISINE_DESCRIPTIONS: Record<string, string> = {
  Italian: "From rustic pasta to wood-fired pizza — explore classic and modern Italian cooking.",
  Asian: "Stir-fries, noodles, and bold flavors spanning East and Southeast Asian kitchens.",
  Mexican: "Tacos, salsas, and comfort food with chiles, lime, and fresh herbs.",
  Mediterranean: "Sun-kissed flavors: olive oil, herbs, grains, and fresh vegetables.",
  Japanese: "Ramen, teriyaki, and delicate balance — precision and comfort in every bowl.",
  Indian: "Aromatics, spices, and regional dishes from dosa to curries.",
  Thai: "Sweet, sour, salty, and spicy — curries, noodles, and street-food energy.",
}

const DIFFICULTY_DESCRIPTIONS: Record<string, string> = {
  Easy: "Perfect for beginners — quick prep, simple techniques, and forgiving recipes you can rely on.",
  Medium: "A step up in skill and time. Great for home cooks looking to expand their repertoire.",
  Hard: "For the ambitious cook — complex techniques, longer prep, and rewarding results.",
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

const CUISINE_TAGS = new Set([
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Indian",
  "Mediterranean",
  "Thai",
  "French",
  "Greek",
  "Korean",
  "Pakistani",
  "Moroccan",
  "American",
  "Turkish",
  "Vietnamese",
  "Lebanese",
  "Spanish",
  "Middle Eastern",
  "Asian",
])
const MEAL_TYPE_TAGS = new Set([
  "Breakfast",
  "Lunch",
  "Dinner",
  "Brunch",
  "Snack",
  "Dessert",
  "Appetizer",
  "Side dish",
  "Main course",
  "Street food",
])
const DIET_TAGS = new Set([
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Keto",
  "Paleo",
  "Low-carb",
  "Dairy-free",
  "Nut-free",
])

export const getCuisineDescription = (cuisine: string): string =>
  CUISINE_DESCRIPTIONS[cuisine] ??
  `Discover ${cuisine} recipes from our collection — full ingredients, instructions, and nutrition info.`

export const getDifficultyDescription = (difficulty: string): string =>
  DIFFICULTY_DESCRIPTIONS[difficulty] ??
  `Explore our collection of ${difficulty.toLowerCase()} recipes with full ingredients and instructions.`

export const getMealTypeDescription = (mealType: string): string =>
  MEAL_TYPE_DESCRIPTIONS[mealType] ??
  `Explore our collection of ${mealType.toLowerCase()} recipes. Find inspiration with step-by-step instructions.`

export const getTagDescription = (tag: string): string => {
  if (CUISINE_TAGS.has(tag)) {
    return `Explore delicious ${tag} recipes. From classic dishes to modern twists, find the best ${tag.toLowerCase()} cooking inspiration.`
  }
  if (MEAL_TYPE_TAGS.has(tag)) {
    return `Discover mouth-watering ${tag.toLowerCase()} recipes perfect for any occasion. Easy to follow and full of flavor.`
  }
  if (DIET_TAGS.has(tag)) {
    return `Browse our collection of ${tag.toLowerCase()} recipes. Healthy, delicious, and easy to make at home.`
  }
  return `Explore our curated collection of ${tag.toLowerCase()} recipes. Find inspiration for your next meal with step-by-step instructions.`
}
