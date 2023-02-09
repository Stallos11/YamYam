import { defineStore } from "pinia";
import { useRecipeCategoryStore } from "./recipeCategories";
import { useRecipeTypeStore } from "./recipeTypes";
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
      
      const stores = {
        users: userStore,
        recipe_types: recipeTypeStore,
        recipe_categories: recipeCategoryStore,
      };

      //@ts-ignore
      return stores[key];
    },
  },
});
