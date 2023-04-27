import { defineStore } from 'pinia';
import { IIngredient, IIngredientCreate } from '../models/ingredients';

interface State {
  isLoading: boolean;
  ingredients: IIngredient[];
  selectedIngredient: IIngredient;
  isModalOpened: boolean;
  isModalDetailOpened: boolean;
  isModalEditOpened: boolean;
}

export const useIngredientStore = defineStore('ingredient', {
  state: (): State => ({
    isLoading: false,
    ingredients: [],
    isModalOpened: false,
    isModalDetailOpened: false,
    isModalEditOpened: false,
    selectedIngredient: {
      id: '',
      openfoodfact_id: null,
      product_name: null,
      product_name_de: null,
      product_name_en: null,
      product_name_fr: null,
      openfoodfact: null,
      nutriments: {},
    },
  }),

  actions: {
    fetchData() {
      return;
    },
    fetchDataDetails(id: string) {
      return this.axios
        .get(`ingredients/${id}`)
        .then((res) => {
          this.selectedIngredient = res.data;
          this.fetchOpenFoodFact();
        })
        .catch(console.error);
    },
    fetchOpenFoodFact() {
      this.axios
        .get(`https://world.openfoodfacts.org/api/v1/product/${this.selectedIngredient.openfoodfact_id}.json`)
        .then((res) => {
          this.selectedIngredient.openfoodfact = res.data.product;
          this.selectedIngredient.nutriments = res.data.product.nutriments;
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
  },
});
