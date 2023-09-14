import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import Config from "@ioc:Adonis/Core/Config";

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public defaultRecipeImage: string;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(setting: Setting) {
    if (Config.get("app.enableUuidGeneration")) setting.id = uuidv4();
  }
}
