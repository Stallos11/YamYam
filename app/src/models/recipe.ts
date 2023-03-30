export interface Recipe {
  id?: string;
  name?: string;
  description?: string;
  preparation_time?: number;
  cooking_time?: number;
  role?: 'admin' | 'member' | 'no-access';
  difficulty?: 1 | 2 | 3 | 4 | 5;
}
