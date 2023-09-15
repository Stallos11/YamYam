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
  amount: number;
  unit: string;
}

export type IIngredientCreate = Omit<IIngredient, "id" | "openfoodfact">;

export const ingredientsTableHeaders: Header[] = [
  { text: "Product Name", value: "product_name", sortable: true },
];

export const ingredientsFilterKeyOptions = [
  "product_name",

];

export const ingredientsQueryKeyOptions = [
  "product_name",
];
