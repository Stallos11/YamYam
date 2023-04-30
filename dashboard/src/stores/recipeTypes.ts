import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";
import { IRecipeType } from "../models/recipe_types";

interface State {
  isLoading: boolean;
  recipe_types: IRecipeType[];
  selectedRecipeType: any;
  isModalOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
}

export const useRecipeTypeStore = defineStore("recipe-type", {
  state: (): State => ({
    isLoading: false,
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

    async fetchData(): Promise<IRecipeType[]> {
      this.isLoading = true;
      return await this.axios
        .get("recipe-types")
        .then((res) => {
          this.recipe_types = res.data;
          return res.data;
        })
        .catch((err) => err)
        .finally(() => {
          this.isLoading = false;
          return this.recipe_types;
        });
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
        .then((res) => {
          this.recipe_types.push(res.data);
          this.toast.showToast(
            "Info",
            "recipe type created",
            "bg-dark",
            "bg-dark"
          );
          this.router.replace("/recipe-types");
        })
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
      this.router.replace("/recipe-types/edit");
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
          this.router.replace("/recipe-types");
        })
        .catch((err) => console.error(err));
    },
  },
});
