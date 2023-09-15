import { defineStore } from 'pinia';
import { IRecipe } from '../models/recipe';
import { useErrorStore } from './error';
import { useAuthStore } from './auth';
import { useIngredientStore } from './ingredients';
import { Favourite } from '../models/favourites';

interface State {
  isLoading: boolean;
  recipes: IRecipe[];
  favourites?: Favourite[];
  recipeCreate: IRecipeCreate;
  recipeEdit: IRecipeEdit;
}

interface IRecipeCreate {
  recipe: Omit<IRecipe, "id">;
  ingredients: IIngredientCreate[];
  instructions: IInstruction[];
}

interface IInstruction {
  title: string;
  description: string
}

interface IRecipeEdit {
  id?: string;
  name: string;
  description: string;
  preparation_time: number | string;
  cooking_time: number;
  difficulty: number;
  eaters_amount: number;
  userId: string;
  recipe_type_id: string;
  recipe_category_id: string;
  ingredients: IIngredientCreate[];
  instructions: IInstruction[];
}

interface IIngredientCreate {
  id: string;
  product_name: string;
  amount: string | number;
  unit: string;
}

export const useRecipeStore = defineStore('recipe', {
  state: (): State => ({
    isLoading: false,
    recipes: [],
    favourites: [],
    recipeCreate: {
      recipe: {
        name: "",
        description: "",
        difficulty: 0,
        eaters_amount: 0,
        cooking_time: 0,
        preparation_time: 0,
        recipe_category_id: "",
        recipe_type_id: "",
        userId: "",
        image: null
      },
      ingredients: [],
      instructions: [],
    },
    recipeEdit: {
      name: "",
      description: "",
      difficulty: 0,
      eaters_amount: 0,
      cooking_time: 0,
      preparation_time: 0,
      recipe_category_id: "",
      recipe_type_id: "",
      userId: "",
      ingredients: [],
      instructions: [],
    }
  }),
  actions: {
    async createRecipe() {
      // @ts-ignore
      this.recipeCreate.recipe.userId = useAuthStore().user?.id as string;
      this.axios
        .post(
          'recipes',
          {
            recipe: this.recipeCreate,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          // this.toast.showToast('Info', 'recipe created', 'bg-dark', 'bg-dark');
          // this.router.push('/recipes');
          // this.recipeCreate = {};
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
    async getFavourites() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .get(`/recipes/favourites`)
        .then((res) => {
          if (res.data) {
            this.favourites = res.data;
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
    insert() {
      this.recipeCreate.recipe.userId = useAuthStore().user?.id as string;
      this.axios
        .post("recipes", {
          recipe: this.recipeCreate,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.recipes.push(res.data);
          this.toast.showToast("Info", "recipe created", "bg-dark", "bg-dark");
          this.router.replace("/recipes");
          this.recipeCreate = {
            recipe: {
              name: "",
              description: "",
              difficulty: 0,
              eaters_amount: 0,
              cooking_time: 0,
              preparation_time: 0,
              recipe_category_id: "",
              recipe_type_id: "",
              userId: "",
              image: null
            },
            ingredients: [],
            instructions: [],
          }
        })
        .catch((err) => console.error(err));
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
    toggleFavourite(id: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      const isFavourite = this.favourites?.some(fav => fav.recipe_id === id);

      if (isFavourite) {
        const favId = this.favourites?.find(fav => fav.recipe_id == id)?.id;

        this.axios
          .delete(`/favourites/${favId}`)
          .then(() => {
            this.getFavourites()
            this.getRecipes()
          })
          .catch((err) => {
            console.error(err);
            if (err.response) errorStore.setError(err.response.data.msg);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.axios
          .post(`/favourites/${id}`)
          .then(() => {
            this.getFavourites()
            this.getRecipes()
          })
          .catch((err) => {
            console.error(err);
            if (err.response) errorStore.setError(err.response.data.msg);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }

    }
  },
});
