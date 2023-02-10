import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Favourite from "./Favourite";
import Recipe from "./Recipe";
import Rating from "./Rating";
import Config from "@ioc:Adonis/Core/Config";



export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public role: "admin" | "user";

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public firstname: string;

  @column()
  public provider: "database" | "google";

  @column()
  public rememberMeToken: string | null;

  @hasMany(() => Favourite)
  public favourites: HasMany<typeof Favourite>;

  @hasMany(() => Recipe)
  public recipes: HasMany<typeof Recipe>;

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>;

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

  @beforeCreate()
  public static async createUUID(user: User) {
    if (Config.get("app.enableUuidGeneration")) user.id = uuidv4();
  }
}
