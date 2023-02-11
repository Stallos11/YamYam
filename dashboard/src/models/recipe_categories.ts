import { Header } from "vue3-easy-data-table";

export interface IRecipeCategory {
  id?: string;
  category: string;
}

export const recipeCategoryTableHeaders: Header[] = [
  { text: "Catégorie", value: "category", sortable: true },
  { text: "Created_at", value: "created_at", sortable: true },
];
export const recipeCategoryFilterKeyOptions = ["category", "created_at"];
