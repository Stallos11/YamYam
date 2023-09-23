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
    },
  }),

  actions: {
    copyRecipeKey(key: string) {
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
    async showDetails(item: ClickRowArgument | string) {
      let id = typeof(item) === 'string' ? item : item.id


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
    addIngredientToCreateRecipe() {
      const ingredientStore = useIngredientStore();

      this.recipeCreate.ingredients.push({
        id: ingredientStore.selectedIngredient.id,
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
    deleteInstruction(index: any) {
      this.recipeEdit.instructions.splice(index, 1);
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
