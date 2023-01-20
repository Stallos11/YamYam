import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Vehicle from "./Vehicle";
import User from "./User";
import { v4 as uuidv4 } from "uuid";

export default class ManutentionOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public state: string;

  @column()
  public description: string;

  @column()
  public vehicleId: string;

  @column()
  public userId: string;

  @hasOne(() => Vehicle)
  public vehicle: HasOne<typeof Vehicle>;

  @hasOne(() => User)
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // @beforeCreate()
  // public static async createUUID(om: ManutentionOrder) {
  //   om.id = uuidv4();
  // }
}
