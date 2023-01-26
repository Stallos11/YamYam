import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Recipe from "./Recipe";
import Config from "@ioc:Adonis/Core/Config";

export default class RecipeCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public category: string;

  @hasMany(() => Recipe)
  public recipe: HasMany<typeof Recipe>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(recipeCategory: RecipeCategory) {
    if (Config.get("disableUuidGeneration")) recipeCategory.id = uuidv4();
  }
}
