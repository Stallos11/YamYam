import { Header } from "vue3-easy-data-table";

export interface IIngredient {
  id: string;
  openfoodfact_id: string | null;
  product_name: string | null;
  product_name_de: string | null;
  product_name_en: string | null;
  product_name_fr: string | null;
  openfoodfact: any;
  nutriments?: any;
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
