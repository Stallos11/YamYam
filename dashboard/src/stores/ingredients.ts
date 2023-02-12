import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";
import { IIngredient, IIngredientCreate } from "../models/ingredients";

interface State {
  isLoading: boolean;
  ingredients: IIngredient[];
  selectedIngredient: IIngredient;
  isModalOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
}

export const useIngredientStore = defineStore("ingredient", {
  state: (): State => ({
    isLoading: true,
    ingredients: [],
    isModalOpened: false,
    isModalDeleteOpened: false,
    isModalEditOpened: false,
    selectedIngredient: {
      id: "",
      openfoodfact_id: null,
      product_name: null,
      product_name_de: null,
      product_name_en: null,
      product_name_fr: null,
      openfoodfact: null,
    },
  }),

  actions: {
    copyIngredientKey(key: string) {
      //@ts-ignore
      navigator.clipboard.writeText(this.selectedIngredient[key]);
    },
    fetchData() {
      return;
      this.isLoading = true;
      this.axios
        .get("ingredients")
        .then((res) => {
          this.ingredients = res.data;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },

    fetchDataDetails(id: string) {
      this.axios
        .get(`ingredients/${id}`)
        .then((res) => {
          this.selectedIngredient = res.data;
          this.fetchOpenFoodFact();
        })
        .catch(console.error);
    },
    fetchOpenFoodFact() {
      this.axios
        .get(
          `https://world.openfoodfacts.org/api/v1/product/${this.selectedIngredient.openfoodfact_id}.json`
        )
        .then((res) => {
          this.selectedIngredient.openfoodfact = res.data.product;
          console.log("res", res);
        })
        .catch((err) => console.error(err));
    },
    searchIngredientBy(property: string, search: string) {
      this.axios
        .post(`ingredients/search/${property}/${search}`)
        .then((res) => {
          this.ingredients = res.data;
        })
        .catch((err) => console.error(err));
    },
    showDetails(item: IIngredient) {
      this.selectedIngredient = item;
      if (item.id) this.fetchDataDetails(item.id);
      this.isModalOpened = true;
    },

    insert(ingredient: IIngredientCreate) {
      this.axios
        .post("ingredients", ingredient)
        .then((res) => {
          this.ingredients.push(res.data);
          this.toast.showToast(
            "Info",
            "IIngredient type created",
            "bg-dark",
            "bg-dark"
          );
          this.router.replace("/ingredients");
        })
        .catch((err) => console.error(err));
    },
    delete() {
      this.axios
        .delete(`ingredients/${this.selectedIngredient.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.ingredients = this.ingredients.filter(
              (IIngredient) => IIngredient.id != this.selectedIngredient.id
            );
            this.isModalOpened = false;
            this.isModalDeleteOpened = false;
            this.toast.showToast(
              "Info",
              "IIngredient type deleted",
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
