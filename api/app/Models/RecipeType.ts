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

export default class RecipeType extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public type: string;

  @hasMany(() => Recipe)
  public recipe: HasMany<typeof Recipe>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(recipeType: RecipeType) {
    recipeType.id = uuidv4();
  }
}
