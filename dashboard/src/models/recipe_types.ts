import { Header } from "vue3-easy-data-table";

export interface IRecipeType {
  id?: string;
  type: string;
}

export const recipeTypeTableHeaders: Header[] = [
  { text: "Type", value: "type", sortable: true },
  { text: "Created_at", value: "created_at", sortable: true },
];
export const recipeTypeFilterKeyOptions = ["type", "created_at"];
