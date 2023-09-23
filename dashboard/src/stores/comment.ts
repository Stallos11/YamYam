import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { useRecipeStore } from './recipes';

interface State {
  isLoading: boolean
  comments: any[];
}

export const useRecipeCommentStore = defineStore('recipe-comment', {
  state: (): State => ({
    isLoading: false,
    comments: [],
  }),
  actions: {
    async getComments() {
      const recipeStore = useRecipeStore();
      this.isLoading = true;

      return this.axios.get(`recipe-comments/${recipeStore.selectedRecipe?.id}`)
        .then(res => {
          if (res.data) this.comments = res.data
        }).catch(err => console.error(err))
        .finally(() => this.isLoading = false)
    },
    async addComment(message: string, stars: number) {
      this.isLoading = true;

      const recipeStore = useRecipeStore();
      const authStore = useAuthStore();

      return this.axios.post(`recipe-comments/${recipeStore.selectedRecipe?.id}`, {
        message,
        stars,
        user_id: authStore.user?.id,
        recipe_id: recipeStore.selectedRecipe?.id
      }).then(async () => {
        await this.getComments()
      }).catch(err => console.error(err))
        .finally(() => this.isLoading = false)
    },
    async deleteComment(id: string) {
      this.isLoading = true;

      return this.axios.delete(`recipe-comments/${id}`).then(async () => {
        await this.getComments()
      }).catch(err => console.error(err))
        .finally(() => this.isLoading = false)
    },
  },
});
