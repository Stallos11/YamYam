import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
} from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column()
  public lastname: string;

  @column()
  public firstname: string;

  @column()
  public role: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password);
    }
  }

  // @beforeCreate()
  // public static async createUUID(user: User) {
  //   user.id = uuidv4();
  // }
}