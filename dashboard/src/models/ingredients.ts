import { Header } from "vue3-easy-data-table";

export interface IIngredient {
  id: string;
  openfoodfact_id: string;
  product_name: string;
  kcal: number;
  fat: number;
  saturated_fat: number;
  carbohydrates: number;
  sugars: number;
  proteins: number;
  salt: number;
  img: string;
}

export type IIngredientCreate = Omit<IIngredient, "id" | "openfoodfact">;

export const ingredientsTableHeaders: Header[] = [
  { text: "OpenFoodFactId", value: "openfoodfact_id", sortable: true },
  { text: "Nom du produit", value: "product_name", sortable: true },
];

export const ingredientsFilterKeyOptions = [
  "openfoodfact_id",
  "product_name",
];

export const ingredientsQueryKeyOptions = [
  "openfoodfact_id",
  "product_name",
];
