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
import Config from "@ioc:Adonis/Core/Config";
import User from "./User";

export default class RecipeComment extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public message: string;

  @column()
  public stars: 1 | 2 | 3 | 4 | 5;

  @column()
  public recipeId: string;

  @column()
  public userId: string;

  @belongsTo(() => Recipe)
  public recipe: BelongsTo<typeof Recipe>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(recipeComment: RecipeComment) {
    if (Config.get("app.enableUuidGeneration")) recipeComment.id = uuidv4();
  }
}
