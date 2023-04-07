import { defineStore } from 'pinia';
import { Category } from '../models/category';
import { useErrorStore } from './error';

interface State {
  isLoading: boolean;
  categories?: Category[];
}

export const useCategoryStore = defineStore('category', {
  state: (): State => ({
    isLoading: true,
    categories: [],
  }),
  actions: {
    async getCategories() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return await this.axios
        .get('recipe-categories')
        .then((res) => {
          this.categories = res.data;
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
