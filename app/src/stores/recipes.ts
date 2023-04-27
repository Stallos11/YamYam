import { defineStore } from 'pinia';
import { Recipe } from '../models/recipe';
import { useErrorStore } from './error';
import { useAuthStore } from './auth';
import { useIngredientStore } from './ingredients';

interface State {
  isLoading: boolean;
  recipes?: Recipe[];
  recipeCreate?: IRecipeCreate;
}

export interface IRecipe {
  id?: string;
  name?: string;
  description?: string;
  preparation_time?: number;
  cooking_time?: number;
  difficulty?: number;
  eaters_amount?: number;
  userId?: string;
  recipe_type_id?: string;
  recipe_category_id?: string;
}

interface IIngredientCreate {
  id?: string;
  product_name?: string;
  quantity?: string | number;
  amount?: string | number;
  unit?: string;
}

interface IRecipeCreate {
  recipe?: Omit<IRecipe, 'id'>;
  ingredients?: IIngredientCreate[];
  instructions?: any;
}

export const useRecipeStore = defineStore('recipe', {
  state: (): State => ({
    isLoading: true,
    recipes: [],
    recipeCreate: {},
  }),
  actions: {
    async createRecipe() {
      // @ts-ignore
      this.recipeCreate.recipe.userId = useAuthStore().user?.id as string;
      this.axios
        .post('recipes', {
          recipe: this.recipeCreate,
        })
        .then((res) => {
          this.toast.showToast('Info', 'recipe created', 'bg-dark', 'bg-dark');
          this.router.push('/recipes');
          this.recipeCreate = {};
        })
        .catch((err) => console.error(err));
    },
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
    addIngredientToCreateRecipe() {
      const ingredientStore = useIngredientStore();

      this.recipeCreate?.ingredients?.push({
        id: ingredientStore.selectedIngredient.id,
        //@ts-ignore
        product_name: ingredientStore.selectedIngredient.product_name,
        amount: '',
        unit: '',
      });
      ingredientStore.isModalDetailOpened = false;
    },
    addInstructionToCreateRecipe(instruction: { title: string; description: string }) {
      this.recipeCreate?.instructions.push({
        title: instruction.title,
        description: instruction.description,
      });
    },
  },
});
