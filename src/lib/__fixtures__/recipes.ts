import type { Recipe } from "@/lib/api"

export const makeRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  id: 1,
  name: "Classic Margherita Pizza",
  ingredients: ["Pizza dough", "Tomato sauce"],
  instructions: ["Preheat oven.", "Bake."],
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  servings: 4,
  difficulty: "Easy",
  cuisine: "Italian",
  caloriesPerServing: 300,
  tags: ["Pizza", "Italian"],
  userId: 166,
  image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  rating: 4.6,
  reviewCount: 98,
  mealType: ["Dinner"],
  ...overrides,
})

export const FIXTURE_RECIPES: Recipe[] = [
  makeRecipe({ id: 1 }),
  makeRecipe({
    id: 2,
    name: "Vegetarian Stir-Fry",
    cuisine: "Asian",
    difficulty: "Medium",
    tags: ["Stir-fry", "Asian", "Vegetarian"],
    mealType: ["Lunch", "Side dish"],
  }),
  makeRecipe({
    id: 38,
    name: "Greek Spanakopita",
    cuisine: "Greek",
    difficulty: "Hard",
    tags: ["Spanakopita", "Greek", "Butter chicken"],
    mealType: ["Appetizer", "Side dish"],
  }),
  makeRecipe({
    id: 4,
    name: "Chef's Pasta",
    cuisine: "Italian",
    tags: ["Pasta", "Italian"],
    mealType: ["Dinner"],
  }),
]

export const toResponse = (recipes: Recipe[]) => ({
  recipes,
  total: recipes.length,
  skip: 0,
  limit: 0,
})
