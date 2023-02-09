import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";
import { User } from "../models/user";

interface RecipeType {
  id: string;
  type: string;
}

interface State {
  isLoading: boolean;
  recipe_types: RecipeType[];
  selectedRecipeType: any;
  isModalOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
}

export const useRecipeTypeStore = defineStore("recipe-type", {
  state: (): State => ({
    isLoading: true,
    recipe_types: [],
    isModalOpened: false,
    isModalDeleteOpened: false,
    isModalEditOpened: false,
    selectedRecipeType: {
      id: "",
      type: "",
    },
  }),

  actions: {
    copyRecipeTypeKey(key: string) {
      //@ts-ignore
      navigator.clipboard.writeText(this.selectedRecipeType[key]);
    },

    fetchData() {
      this.isLoading = true;
      this.axios
        .get("recipe-types")
        .then((res) => {
          this.recipe_types = res.data;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },

    fetchDataDetails(id: string) {
      this.axios
        .get(`recipe-types/${id}`)
        .then((res) => {
          this.selectedRecipeType = res.data;
        })
        .catch(console.error);
    },

    showDetails(item: ClickRowArgument) {
      this.selectedRecipeType = item;
      this.fetchDataDetails(item.id);
      this.isModalOpened = true;
    },

    insert(recipe_type: string) {
      this.axios
        .post("recipe-types", {
          recipe_type,
        })
        .then((res) => this.recipe_types.push(res.data))
        .catch((err) => console.error(err));
    },
    delete() {
      this.axios
        .delete(`recipe-types/${this.selectedRecipeType.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.recipe_types = this.recipe_types.filter(
              (recipe_type) => recipe_type.id != this.selectedRecipeType.id
            );
            this.isModalOpened = false;
            this.isModalDeleteOpened = false;
            this.toast.showToast(
              "Info",
              "recipe type deleted",
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
      this.router.push({ name: "recipe-types-edit" });
    },
    update() {
      this.axios
        .put(`recipe-types/${this.selectedRecipeType.id}`, {
          type: this.selectedRecipeType.type,
        })
        .then((res) => {
          this.toast.showToast(
            "Info",
            "recipe type updated",
            "bg-dark",
            "bg-dark"
          );
        })
        .catch((err) => console.error(err));
    },
  },
});
