import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4 } from "uuid";

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public numberPlate: string;

  @column()
  public vin: string;

  @column()
  public location: string;

  @column()
  public state: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(vehicle: Vehicle) {
    console.log("begin", vehicle.id)
    if(vehicle.id == null){
      vehicle.id = uuidv4();
    }
    console.log("end", vehicle.id)
  }
}
