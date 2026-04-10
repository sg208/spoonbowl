import { useQuery } from "@tanstack/react-query"
import {
  fetchAllRecipes,
  fetchCuisines,
  fetchFeaturedRecipe,
  fetchMealTypes,
  fetchRecipe,
  fetchRecipes,
  fetchRecipesByCuisine,
  fetchRecipesByMealType,
  fetchRecipesByTag,
  fetchTags,
} from "@/lib/api"
import { notFoundKeys, recipeDetailKeys, recipeKeys, recipeMetaKeys } from "@/lib/keys/recipeKeys"

export const useFeaturedRecipe = () =>
  useQuery({
    queryKey: recipeKeys.featured(),
    queryFn: fetchFeaturedRecipe,
  })

export const useRecipeGrid = (limit: number, skip: number) =>
  useQuery({
    queryKey: recipeKeys.grid({ limit, skip }),
    queryFn: () => fetchRecipes(limit, skip),
  })

export const useCuisines = () =>
  useQuery({
    queryKey: recipeMetaKeys.cuisines(),
    queryFn: fetchCuisines,
  })

export const useRecipesByCuisine = (cuisine: string, listReady: boolean) =>
  useQuery({
    queryKey: recipeKeys.byCuisine(cuisine),
    queryFn: () => fetchRecipesByCuisine(cuisine),
    enabled: Boolean(cuisine) && listReady,
  })

export const useTags = () =>
  useQuery({
    queryKey: recipeMetaKeys.tags(),
    queryFn: fetchTags,
  })

export const useRecipesByTag = (tag: string, listReady: boolean) =>
  useQuery({
    queryKey: recipeKeys.byTag(tag),
    queryFn: () => fetchRecipesByTag(tag),
    enabled: Boolean(tag) && listReady,
  })

export const useMealTypes = () =>
  useQuery({
    queryKey: recipeMetaKeys.mealTypes(),
    queryFn: fetchMealTypes,
  })

export const useRecipesByMealType = (mealType: string, listReady: boolean) =>
  useQuery({
    queryKey: recipeKeys.byMealType(mealType),
    queryFn: () => fetchRecipesByMealType(mealType),
    enabled: Boolean(mealType) && listReady,
  })

export const useRecipeDetail = (id: number) =>
  useQuery({
    queryKey: recipeDetailKeys.detail(id),
    queryFn: () => fetchRecipe(id),
    enabled: Number.isInteger(id) && id > 0,
  })

export const useNotFoundRandomRecipe = () =>
  useQuery({
    queryKey: notFoundKeys.randomRecipe(),
    queryFn: async () => {
      const res = await fetchAllRecipes()
      if (res.recipes.length === 0) return null
      const index = Math.floor(Math.random() * res.recipes.length)
      return res.recipes[index] ?? null
    },
  })
