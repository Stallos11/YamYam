import { IIngredient } from "./ingredients";

export interface IRecipe {
  id?: string;
  name: string;
  description: string;
  preparation_time: number | string;
  cooking_time: number | string;
  difficulty: number;
  eaters_amount: number;
  userId: string;
  recipe_type_id: string;
  recipe_category_id: string;
  image: any;
}

interface IInstruction {
  title: string;
  description: string
}

export interface ISelectedRecipe {
  id: string;
  name: string;
  description: string;
  preparation_time: number | string;
  cooking_time: number | string;
  difficulty: number;
  eaters_amount: number;
  userId: string;
  recipe_type_id: string;
  recipe_category_id: string;
  image: string;
  ingredients: IIngredient[];
  instructions: IInstruction[];
}