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
