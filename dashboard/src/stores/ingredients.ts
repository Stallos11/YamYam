import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";
import { IIngredient, IIngredientCreate } from "../models/ingredients";

interface State {
  isLoading: boolean;
  ingredients: IIngredient[];
  selectedIngredient: IIngredient;
  isModalOpened: boolean;
  isModalDetailOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
}

export const useIngredientStore = defineStore("ingredient", {
  state: (): State => ({
    isLoading: false,
    ingredients: [],
    isModalOpened: false,
    isModalDeleteOpened: false,
    isModalDetailOpened: false,
    isModalEditOpened: false,
    selectedIngredient: {
      id: '',
      openfoodfact_id: '',
      product_name: '',
      kcal: 0,
      fat: 0,
      saturated_fat: 0,
      carbohydrates: 0,
      sugars: 0,
      proteins: 0,
      salt: 0,
      img: ''
    },
  }),

  actions: {
    copyIngredientKey(key: string) {
      //@ts-ignore
      navigator.clipboard.writeText(this.selectedIngredient[key]);
    },
    fetchData() {
      return;
    },
    fetchDataDetails(id: string) {
      return this.axios
        .get(`ingredients/${id}`)
        .then((res) => {
          this.selectedIngredient = res.data;
        })
        .catch(console.error);
    },
    searchIngredientBy(property: string, search: string) {
      this.axios
        .post(`ingredients/search/${property}/${search}`)
        .then((res) => {
          this.ingredients = res.data;
        })
        .catch((err) => console.error(err));
    },
    async showDetails(item: IIngredient) {
      this.selectedIngredient = item;
      if (item.id) await this.fetchDataDetails(item.id);

      this.isModalOpened = true;
    },
    showIngredientDetails(item: IIngredient) {
      this.selectedIngredient = item;
      if (item.id) this.fetchDataDetails(item.id);
      this.isModalDetailOpened = true;
    },
    delete() {
      this.axios
        .delete(`ingredients/${this.selectedIngredient?.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.ingredients = this.ingredients.filter(
              (IIngredient) => IIngredient.id != this.selectedIngredient?.id
            );
            this.isModalOpened = false;
            this.isModalDeleteOpened = false;
            this.toast.showToast(
              "Info",
              "Ingredient deleted",
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
      this.router.replace("/ingredients/edit");
    },
    update() {
      this.axios
        .put(
          `ingredients/${this.selectedIngredient.id}`,
          this.selectedIngredient
        )
        .then((res) => {
          this.toast.showToast(
            "Info",
            "IIngredient updated",
            "bg-dark",
            "bg-dark"
          );
          this.router.replace("/ingredients");
        })
        .catch((err) => console.error(err));
    },
  },
});
