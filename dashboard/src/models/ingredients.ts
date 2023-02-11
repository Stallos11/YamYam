import { Header } from "vue3-easy-data-table";

export interface IIngredient {
  id?: string;
  openfoodfact_id: string | null;
  product_name: string | null;
  product_name_de: string | null;
  product_name_en: string | null;
  product_name_fr: string | null;
}

export type IIngredientCreate = Omit<IIngredient, "id">;

export const ingredientsTableHeaders: Header[] = [
  { text: "OpenFoodFactId", value: "openfoodfact_id", sortable: true },
  { text: "Product Name", value: "product_name", sortable: true },
  { text: "Product Name FR", value: "product_name_fr", sortable: true },
  { text: "Product Name EN", value: "product_name_en", sortable: true },
  { text: "Product Name DE", value: "product_name_de", sortable: true },
  { text: "Created_at", value: "created_at", sortable: true },
];


export const ingredientsFilterKeyOptions = [
  "openfoodfact_id",
  "product_name",
  "product_name_fr",
  "product_name_en",
  "product_name_de",
  "created_at",
];

export const ingredientsQueryKeyOptions = [
  "uuid",
  "openfoodfact_id",
  "product_name",
  "product_name_fr",
  "product_name_en",
  "product_name_de",
  "created_at",
];
