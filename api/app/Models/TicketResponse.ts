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
import Ticket from "./Ticket";

export default class TicketResponse extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public message: string;

  @column()
  public userId: string;

  @column()
  public ticketId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Ticket)
  public ticket: BelongsTo<typeof Ticket>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(ticketResponse: TicketResponse) {
    if (Config.get("app.enableUuidGeneration")) ticketResponse.id = uuidv4();
  }
}
