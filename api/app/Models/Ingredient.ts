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
import Config from "@ioc:Adonis/Core/Config";

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public openfoodfact_id: string;
  @column()
  public product_name: string;
  @column()
  public product_name_fr: string;
  @column()
  public product_name_en: string;
  @column()
  public product_name_de: string;

  @hasMany(() => RecipeIngredient)
  public ingredients: HasMany<typeof RecipeIngredient>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(ingredient: Ingredient) {
    if (Config.get("app.enableUuidGeneration")) ingredient.id = uuidv4();
  }
}
