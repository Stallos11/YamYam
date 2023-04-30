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
import Config from "@ioc:Adonis/Core/Config";

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public message: string;

  @column()
  public status: 'in progress' | 'closed';

  @column()
  public priority: 'low' | 'medium' | 'high';

  @column()
  public response: string;

  @column()
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(ticket: Ticket) {
    if (Config.get("app.enableUuidGeneration")) ticket.id = uuidv4();
  }
}
