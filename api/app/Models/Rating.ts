import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Recipe from "./Recipe";

export default class Rating extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public mark: number;

  @column()
  public comment: string;

  @column()
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column()
  public recipeId: string;

  @belongsTo(() => Recipe)
  public recipe: BelongsTo<typeof Recipe>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(rating: Rating) {
    rating.id = uuidv4();
  }
}
