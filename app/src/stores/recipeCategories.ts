import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
  recipe_categories: IRecipeCategory[];
}

export interface IRecipeCategory {
  id?: string;
  category: string;
}

export const useRecipeCategoryStore = defineStore('recipe-category', {
  state: (): State => ({
    isLoading: false,
    recipe_categories: [],
  }),
  actions: {
    async fetchData(): Promise<IRecipeCategory[]> {
      this.isLoading = true;
      return await this.axios
        .get('recipe-categories')
        .then((res) => {
          this.recipe_categories = res.data;
          return res.data;
        })
        .catch((err) => err)
        .finally(() => {
          this.isLoading = false;
          return this.recipe_categories;
        });
    },
  },
});
