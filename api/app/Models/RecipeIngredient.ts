import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import Recipe from "./Recipe";
import Ingredient from "./Ingredient";
import Config from "@ioc:Adonis/Core/Config";

export default class RecipeIngredient extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public amount: number;

  @column()
  public unit: string;

  @column()
  public recipeId: string;

  @belongsTo(() => Recipe)
  public recipe: BelongsTo<typeof Recipe>;

  @column()
  public ingredientId: string;

  @belongsTo(() => Ingredient)
  public ingredient: BelongsTo<typeof Ingredient>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(recipeIngredient: RecipeIngredient) {
    if (Config.get("app.enableUuidGeneration")) recipeIngredient.id = uuidv4();
  }
}
