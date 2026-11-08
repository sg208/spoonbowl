const CUISINE_DESCRIPTIONS: Record<string, string> = {
  Italian: "Pasta, pizza and the slow sauces that go with them.",
  Asian: "Stir-fries, noodles and rice dishes from East and Southeast Asian kitchens.",
  Mexican: "Tacos, salsas and stews built on chiles, lime and fresh herbs.",
  Mediterranean: "Olive oil, herbs, grains and plenty of vegetables.",
  Japanese: "Ramen, teriyaki and other dishes where balance matters.",
  Indian: "Spiced curries, dals and dosas from across India's regions.",
  Thai: "Curries and noodles that balance sweet, sour, salty and hot.",
}

const DIFFICULTY_DESCRIPTIONS: Record<string, string> = {
  Easy: "Short prep, few techniques, hard to get wrong.",
  Medium: "More steps and a bit more time, for cooks who want to stretch.",
  Hard: "Longer prep and harder techniques. Worth it on a free afternoon.",
}

const MEAL_TYPE_DESCRIPTIONS: Record<string, string> = {
  Breakfast: "Quick weekday breakfasts and slower ones for the weekend.",
  Lunch: "Sandwiches, salads and other midday meals.",
  Dinner: "Weeknight staples and bigger dishes for when you have time.",
  Brunch: "Late-morning dishes for a slow weekend.",
  Snack: "Small bites for between meals.",
  Dessert: "Cakes, puddings and other things with sugar in them.",
  Appetizer: "Starters and small plates to open a meal.",
  "Side dish": "Sides to put next to a main course.",
  "Main course": "Dishes that make the centre of a meal.",
  "Street food": "Food from markets and stalls around the world.",
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
const MEAL_TYPE_TAGS = new Set(Object.keys(MEAL_TYPE_DESCRIPTIONS))
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
  `${cuisine} recipes, with ingredients, steps and nutrition for each.`

export const getDifficultyDescription = (difficulty: string): string =>
  DIFFICULTY_DESCRIPTIONS[difficulty] ??
  `${difficulty} recipes, with the ingredients and steps for each.`

export const getMealTypeDescription = (mealType: string): string =>
  MEAL_TYPE_DESCRIPTIONS[mealType] ??
  `${mealType} recipes, with the ingredients and steps for each.`

export const getTagDescription = (tag: string): string => {
  if (CUISINE_TAGS.has(tag)) return `${tag} dishes, with the ingredients and steps for each.`
  if (MEAL_TYPE_TAGS.has(tag)) return `${tag} recipes you can cook from.`
  if (DIET_TAGS.has(tag)) return `${tag} recipes, each with its full ingredient list.`
  return `Recipes tagged ${tag.toLowerCase()}.`
}
