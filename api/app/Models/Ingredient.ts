import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import RecipeIngredient from "./RecipeIngredient";

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @hasMany(() => RecipeIngredient)
  public ingredients: HasMany<typeof RecipeIngredient>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(ingredient: Ingredient) {
    ingredient.id = uuidv4();
  }
}
