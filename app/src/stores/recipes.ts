import { defineStore } from 'pinia';
import { IEditRecipe, IRecipe, ISelectedRecipe } from '../models/recipe';
import { useErrorStore } from './error';
import { useAuthStore } from './auth';
import { useIngredientStore } from './ingredients';
import { Favourite } from '../models/favourites';

interface State {
  isLoading: boolean;
  recipes: IRecipe[];
  selectedRecipe?: ISelectedRecipe;
  favourites?: Favourite[];
  recipeCreate: IRecipeCreate;
  recipeEdit: IEditRecipe;
  userRecipes?: IRecipe[];
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

interface IIngredientCreate {
  id: string;
  product_name: string;
  amount: string | number;
  unit: string;
  img: string;
  openfoodfact_id: string;
  nutriments: {
    kcal: number;
    fat: number;
    saturated_fat: number;
    carbs: number;
    sugars: number;
    proteins: number;
    salt: number;
  }
}

export const useRecipeStore = defineStore('recipe', {
  state: (): State => ({
    isLoading: false,
    recipes: [],
    userRecipes: [],
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
        user_id: "",
        image: null
      },
      ingredients: [],
      instructions: [],
    },
    recipeEdit: {
      id: "",
      name: "",
      description: "",
      difficulty: 0,
      eaters_amount: 0,
      cooking_time: 0,
      preparation_time: 0,
      recipe_category_id: "",
      recipe_type_id: "",
      user_id: "",
      image: "",
      ingredients: [],
      instructions: [],
      previewImage: ''
    },
    selectedRecipe: {
      id: "",
      name: "",
      description: "",
      difficulty: 0,
      eaters_amount: 0,
      cooking_time: 0,
      preparation_time: 0,
      recipe_category_id: "",
      recipe_type_id: "",
      user_id: "",
      image: "",
      ingredients: [],
      instructions: [],
    }
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
      this.recipeCreate.recipe.user_id = useAuthStore().user?.id as string;
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
              user_id: "",
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
        openfoodfact_id: ingredientStore.selectedIngredient.openfoodfact_id,
        img: ingredientStore.selectedIngredient.img,
        nutriments: {
          kcal: ingredientStore.selectedIngredient.kcal,
          fat: ingredientStore.selectedIngredient.fat,
          saturated_fat: ingredientStore.selectedIngredient.saturated_fat,
          carbs: ingredientStore.selectedIngredient.carbohydrates,
          sugars: ingredientStore.selectedIngredient.sugars,
          proteins: ingredientStore.selectedIngredient.proteins,
          salt: ingredientStore.selectedIngredient.salt,
        }
      });
      ingredientStore.isModalDetailOpened = false;
    },
    addIngredientToEditRecipe() {
      const ingredientStore = useIngredientStore();

      this.recipeEdit?.ingredients?.push({
        id: ingredientStore.selectedIngredient.id,
        //@ts-ignore
        product_name: ingredientStore.selectedIngredient.product_name,
        amount: '',
        openfoodfact_id: ingredientStore.selectedIngredient.openfoodfact_id,
        img: ingredientStore.selectedIngredient.img,
        unit: '',
        nutriments: {
          kcal: ingredientStore.selectedIngredient.kcal,
          fat: ingredientStore.selectedIngredient.fat,
          saturated_fat: ingredientStore.selectedIngredient.saturated_fat,
          carbs: ingredientStore.selectedIngredient.carbohydrates,
          sugars: ingredientStore.selectedIngredient.sugars,
          proteins: ingredientStore.selectedIngredient.proteins,
          salt: ingredientStore.selectedIngredient.salt,
        }
      });
      ingredientStore.isModalDetailOpened = false;
    },
    addInstructionToCreateRecipe(instruction: { title: string; description: string }) {
      this.recipeCreate?.instructions.push({
        title: instruction.title,
        description: instruction.description,
      });
    },
    addInstructionToEditRecipe(instruction: { title: string; description: string }) {
      this.recipeEdit?.instructions.push({
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
    },
    async showDetails(id: string) {
      this.isLoading = true;

      return this.axios
        .get(`recipes/${id}`)
        .then((res) => {
          if (res.data) {
            this.selectedRecipe = res.data;
            this.router.push(`/recipes/${id}`)
          }
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false
        })
    },
    async getUserRecipes() {
      this.isLoading = true;

      return this.axios
        .get(`/recipes/user-recipes`)
        .then((res) => {
          if (res.data) {
            this.userRecipes = res.data;
          }
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false
        })
    },
    async editRecipe(id: string) {
      this.isLoading = true;

      return this.axios
        .get(`recipes/${id}`)
        .then((res) => {
          if (res.data) {
            this.recipeEdit = res.data;
            this.router.push(`/recipes/edit/${id}`)
          }
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false
        });
    },
    async deleteRecipe(id: string) {
      this.isLoading = true;

      return this.axios
        .delete(`recipes/${id}`)
        .then(() => {
          this.router.push('/recipes')
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false
        });
    },
    update() {
      this.axios
        .put(`recipes/${this.recipeEdit.id}`, {
          recipe: this.recipeEdit,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(async () => {
          await this.getRecipes()
          this.toast.showToast("Info", "recipe updated", "bg-dark", "bg-dark");
          this.router.replace("/recipes");
          this.recipeEdit = {
            id: "",
            name: "",
            description: "",
            difficulty: 0,
            eaters_amount: 0,
            cooking_time: 0,
            preparation_time: 0,
            recipe_category_id: "",
            recipe_type_id: "",
            user_id: "",
            image: "",
            ingredients: [],
            instructions: [],
          }
        })
        .catch((err) => console.error(err));
    },
  },

});
