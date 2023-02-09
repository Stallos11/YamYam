import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";

interface RecipeCategory {
  id: string;
  category: string;
}

interface State {
  isLoading: boolean;
  recipe_categories: RecipeCategory[];
  selectedRecipeCategory: any;
  isModalOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
}

export const useRecipeCategoryStore = defineStore("recipe-category", {
  state: (): State => ({
    isLoading: true,
    recipe_categories: [],
    isModalOpened: false,
    isModalDeleteOpened: false,
    isModalEditOpened: false,
    selectedRecipeCategory: {
      id: "",
      category: "",
    },
  }),

  actions: {
    copyRecipeCategoryKey(key: string) {
      //@ts-ignore
      navigator.clipboard.writeText(this.selectedRecipeCategory[key]);
    },

    fetchData() {
      this.isLoading = true;
      this.axios
        .get("recipe-categories")
        .then((res) => {
          this.recipe_categories = res.data;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },

    fetchDataDetails(id: string) {
      this.axios
        .get(`recipe-categories/${id}`)
        .then((res) => {
          this.selectedRecipeCategory = res.data;
        })
        .catch(console.error);
    },

    showDetails(item: ClickRowArgument) {
      this.selectedRecipeCategory = item;
      this.fetchDataDetails(item.id);
      this.isModalOpened = true;
    },

    insert(recipe_category: string) {
      console.log("rec", recipe_category);
      this.axios
        .post("recipe-categories", {
          recipe_category,
        })
        .then((res) => {
          this.recipe_categories.push(res.data);
          this.toast.showToast(
            "Info",
            "recipe category created",
            "bg-dark",
            "bg-dark"
          );
          this.router.replace("/recipe-categories");
        })
        .catch((err) => console.error(err));
    },
    delete() {
      this.axios
        .delete(`recipe-categories/${this.selectedRecipeCategory.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.recipe_categories = this.recipe_categories.filter(
              (recipe_category) =>
                recipe_category.id != this.selectedRecipeCategory.id
            );
            this.isModalOpened = false;
            this.isModalDeleteOpened = false;
            this.toast.showToast(
              "Info",
              "recipe category deleted",
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
      this.router.replace('/recipe-categories/edit');
    },
    update() {
      this.axios
        .put(`recipe-categories/${this.selectedRecipeCategory.id}`, {
          category: this.selectedRecipeCategory.category,
        })
        .then((res) => {
          this.toast.showToast(
            "Info",
            "recipe category updated",
            "bg-dark",
            "bg-dark"
          );
          this.router.replace("/recipe-categories");
        })
        .catch((err) => console.error(err));
    },
  },
});
