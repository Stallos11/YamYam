import { defineStore } from 'pinia';
import { Type } from '../models/type';
import { useErrorStore } from './error';

interface State {
  isLoading: boolean;
  types?: Type[];
}

export const useTypeStore = defineStore('type', {
  state: (): State => ({
    isLoading: true,
    types: [],
  }),
  actions: {
    async getTypes() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return await this.axios
        .get('recipe-types')
        .then((res) => {
          this.types = res.data;
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
