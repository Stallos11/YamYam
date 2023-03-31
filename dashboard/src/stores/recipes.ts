import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";
import { IRecipe } from "../models/recipes";
import { useIngredientStore } from "./ingredients";
import { useAuthStore } from "./auth";

interface State {
  isLoading: boolean;
  recipes: IRecipe[];
  selectedRecipe: any;
  isModalOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
  recipeCreate: IRecipeCreate;
}

interface IRecipeCreate {
  recipe: Omit<IRecipe, "id">;
  ingredients: IIngredientCreate[];
  instructions: any;
}

interface IIngredientCreate {
  id: string;
  product_name: string;
  quantity: string | number;
  amount: string | number;
  unit: string;
}

export const useRecipeStore = defineStore("recipe", {
  state: (): State => ({
    isLoading: true,
    recipes: [],
    isModalOpened: false,
    isModalDeleteOpened: false,
    isModalEditOpened: false,
    selectedRecipe: {
      id: "",
      name: "",
    },
    recipeCreate: {
      recipe: {
        name: "",
        description: "",
        difficulty: 0,
        eatersAmount: 0,
        cookingTime: 0,
        preparationTime: 0,
        recipeCategoryId: "",
        recipeTypeId: "",
        userId: "",
      },
      ingredients: [],
      instructions: [],
    },
  }),

  actions: {
    copyRecipeKey(key: string) {
      //@ts-ignore
      navigator.clipboard.writeText(this.selectedRecipe[key]);
    },

    fetchData() {
      this.isLoading = true;
      this.axios
        .get("recipes")
        .then((res) => {
          this.recipes = res.data;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },

    fetchDataDetails(id: string) {
      this.axios
        .get(`recipes/${id}`)
        .then((res) => {
          this.selectedRecipe = res.data;
        })
        .catch(console.error);
    },

    showDetails(item: ClickRowArgument) {
      this.selectedRecipe = item;
      this.fetchDataDetails(item.id);
      this.isModalOpened = true;
    },

    insert() {
      this.recipeCreate.recipe.userId = useAuthStore().user?.id as string;
      this.axios
        .post("recipes", {
          recipe: this.recipeCreate,
        })
        .then((res) => {
          this.recipes.push(res.data);
          this.toast.showToast("Info", "recipe created", "bg-dark", "bg-dark");
          this.router.replace("/recipes");
        })
        .catch((err) => console.error(err));
    },
    delete() {
      this.axios
        .delete(`recipes/${this.selectedRecipe.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.recipes = this.recipes.filter(
              (recipe) => recipe.id != this.selectedRecipe.id
            );
            this.isModalOpened = false;
            this.isModalDeleteOpened = false;
            this.toast.showToast(
              "Info",
              "recipe deleted",
              "bg-dark",
              "bg-dark"
            );
          }
        })
        .catch((err) => console.error(err));
    },
    cancelDelete() {
      this.isModalDeleteOpened = !this.isModalDeleteOpened;
    },
    showDeleteModal() {
      this.isModalDeleteOpened = true;
    },
    redirEdit() {
      this.isModalOpened = false;
      this.router.replace("/recipes/edit");
    },
    update() {
      this.axios
        .put(`recipes/${this.selectedRecipe.id}`, {
          name: this.selectedRecipe.name,
        })
        .then((res) => {
          this.toast.showToast("Info", "recipe updated", "bg-dark", "bg-dark");
          this.router.replace("/recipes");
        })
        .catch((err) => console.error(err));
    },
    addIngredientToCreateRecipe() {
      const ingredientStore = useIngredientStore();

      this.recipeCreate.ingredients.push({
        id: ingredientStore.selectedIngredient.id,
        //@ts-ignore
        product_name: ingredientStore.selectedIngredient.product_name,
        amount: "",
        unit: "",
      });
      ingredientStore.isModalDetailOpened = false;
    },
    addInstructionToCreateRecipe(instruction: {
      title: string;
      description: string;
    }) {
      this.recipeCreate.instructions.push({
        title: instruction.title,
        description: instruction.description,
      });
    },
  },
});
