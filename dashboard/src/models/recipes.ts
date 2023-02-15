import { Header } from "vue3-easy-data-table";

export interface IRecipe {
  id?: string;
  name: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  difficulty: number;
  eatersAmount: number;
  userId: string;
  recipeTypeId: string;
  recipeCategoryId: string;
}

export const recipeTableHeaders: Header[] = [
  { text: "Name", value: "name", sortable: true },
  { text: "Description", value: "description", sortable: true },
  { text: "Tps de préparation", value: "preparation_time", sortable: true },
  { text: "Tps de cuisson", value: "cooking_time", sortable: true },
  { text: "Difficulté", value: "difficulty", sortable: true },
  { text: "Nbr de personnes", value: "eaters_amount", sortable: true },
  { text: "Utilisateur", value: "user_id", sortable: true },
  { text: "Type", value: "recipe_type_id", sortable: true },
  { text: "Categorie", value: "recipe_category_id", sortable: true },
  { text: "Créé le", value: "created_at", sortable: true },
];

export const recipeFilterKeyOptions = [
  "name",
  "description",
  "preparation_time",
  "cookingTime",
  "difficulty",
  "eaters_amount",
  "user_id",
  "recipe_type_id",
  "recipe_category_id",
  "created_at",
];
