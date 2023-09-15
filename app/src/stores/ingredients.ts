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
    showIngredientDetails(item: IIngredient) {
      this.selectedIngredient = item;
      if (item.id) this.fetchDataDetails(item.id);
      this.isModalDetailOpened = true;
    },
    searchIngredientBy(property: string, search: string) {
      this.axios
        .post(`ingredients/search/${property}`, {
          search
        })
        .then((res) => {
          this.ingredients = res.data;
        })
        .catch((err) => console.error(err));
    },
  },
});
