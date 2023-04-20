import { Header } from "vue3-easy-data-table";

export interface IRecipe {
  id?: string;
  name: string;
  description: string;
  preparation_time: number;
  cooking_time: number;
  difficulty: number;
  eaters_amount: number;
  userId: string;
  recipe_type_id: string;
  recipe_category_id: string;
}

export const recipeTableHeaders: Header[] = [
  { text: "Name", value: "name", sortable: true },
  { text: "Description", value: "description", sortable: true },
  { text: "Tps de préparation", value: "preparation_time", sortable: true },
  { text: "Tps de cuisson", value: "cooking_time", sortable: true },
  { text: "Difficulté", value: "difficulty", sortable: true },
  { text: "Nbr de personnes", value: "eaters_amount", sortable: true },
  { text: "Utilisateur", value: "user.email", sortable: true },
  { text: "Type", value: "recipeType.type", sortable: true },
  { text: "Categorie", value: "recipeCategory.category", sortable: true },
  { text: "Créé le", value: "created_at", sortable: true },
];

export const recipeFilterKeyOptions = [
  { name: "Name", value: "name" },
  { name: "Description", value: "description" },
  { name: "Preparation time", value: "preparation_time" },
  { name: "Cooking time", value: "cookingTime" },
  { name: "Difficulty", value: "difficulty" },
  { name: "Eaters amout", value: "eaters_amount" },
  { name: "Email", value: "user.email" },
  { name: "Type", value: "recipe_type_id" },
  { name: "Category", value: "recipe_category_id" },
  { name: "Created at", value: "created_at" }
];
