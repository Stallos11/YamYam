import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
  recipe_types: IRecipeType[];
}

export interface IRecipeType {
  id?: string;
  type: string;
}

export const useRecipeTypeStore = defineStore('recipe-type', {
  state: (): State => ({
    isLoading: true,
    recipe_types: [],
  }),

  actions: {
    async fetchData(): Promise<IRecipeType[]> {
      this.isLoading = true;
      return await this.axios
        .get('recipe-types')
        .then((res) => {
          this.recipe_types = res.data;
          return res.data;
        })
        .catch((err) => err)
        .finally(() => {
          this.isLoading = false;
          return this.recipe_types;
        });
    },
  },
});
