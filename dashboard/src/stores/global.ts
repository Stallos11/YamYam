import { defineStore } from "pinia";
import { useIngredientStore } from "./ingredients";
import { useRecipeCategoryStore } from "./recipeCategories";
import { useRecipeTypeStore } from "./recipeTypes";
import { useRecipeStore } from "./recipes";
import { useUserStore } from "./user";

interface State {
  info: string;
}

export const useGlobalStore = defineStore("global", {
  state: () => ({
    info: "toto",
  }),
  actions: {
    getStore(key: string) {
      const userStore = useUserStore();
      const recipeTypeStore = useRecipeTypeStore();
      const recipeCategoryStore = useRecipeCategoryStore();
      const ingredientStore = useIngredientStore();
      const recipeStore = useRecipeStore();

      const stores = {
        users: userStore,
        recipe_types: recipeTypeStore,
        recipe_categories: recipeCategoryStore,
        ingredients: ingredientStore,
        recipes: recipeStore,
      };

      //@ts-ignore
      return stores[key];
    },
  },
});
