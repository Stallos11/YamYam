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
  recipeEdit: IRecipeEdit;
}

interface IRecipeCreate {
  recipe: Omit<IRecipe, "id">;
  ingredients: IIngredientCreate[];
  instructions: any;
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
    isLoading: false,
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
        eaters_amount: 0,
        cooking_time: 0,
        preparation_time: 0,
        recipe_category_id: "",
        recipe_type_id: "",
        userId: "",
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
            },
            ingredients: [],
            instructions: [],
          }
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
      console.log(this.selectedRecipe)
      this.recipeEdit = this.selectedRecipe
      //@ts-ignore
      this.recipeEdit.preparation_time = this.secToMins(this.recipeEdit.preparation_time)
      //@ts-ignore
      this.recipeEdit.cooking_time = this.secToMins(this.recipeEdit.cooking_time)
      //@ts-ignore
      this.recipeEdit.difficulty = parseInt(this.recipeEdit.difficulty)
      this.router.replace("/recipes/edit");
    },
    secToMins(secs: number) {
      const hours = Math.floor(secs / 3600)
      const minutes = Math.floor(secs / 60) % 60

      return [hours, minutes]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
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
    addIngredientToEditRecipe() {
      const ingredientStore = useIngredientStore();

      this.recipeEdit.ingredients.push({
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
    addInstructionToEditRecipe(instruction: {
      title: string;
      description: string;
    }) {
      this.recipeEdit.instructions.push({
        title: instruction.title,
        description: instruction.description,
      });
    },
    deleteInstruction(id: string) {
      this.recipeEdit.instructions = this.recipeEdit.instructions.filter(inst => inst.id != id)
    },
    deleteIngredient(id: string) {
      this.recipeEdit.ingredients = this.recipeEdit.ingredients.filter(ing => ing.id != id)
    },
    update() {
      this.recipeEdit.userId = useAuthStore().user?.id as string;
      this.axios
        .put(`recipes/${this.recipeEdit.id}`, {
          recipe: this.recipeEdit,
        })
        .then((res) => {
          this.fetchData()
          this.toast.showToast("Info", "recipe updated", "bg-dark", "bg-dark");
          this.router.replace("/recipes");
          this.recipeEdit = {
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
        })
        .catch((err) => console.error(err));
    },
  },
});
