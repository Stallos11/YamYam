import { defineStore } from 'pinia';
import { Recipe } from '../models/recipe';
import { useErrorStore } from './error';

interface State {
  isLoading: boolean;
  recipes?: Recipe[];
}

export const useRecipeStore = defineStore('recipe', {
  state: (): State => ({
    isLoading: true,
    recipes: [],
  }),
  actions: {
    async getRecipes() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .get(`/recipes`)
        .then((res) => {
          if (res.data) {
            this.recipes = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) errorStore.setError(err.response.data.msg);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
