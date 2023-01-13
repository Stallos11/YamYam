import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Vehicle from "App/Models/Vehicle";

export default class VehicleSeeder extends BaseSeeder {
  public async run() {
    await Vehicle.updateOrCreate(
      {
        id: "0d0ea5c9-f815-4cfe-9c66-4aaae8c14a2f",
      },
      {
        id: "0d0ea5c9-f815-4cfe-9c66-4aaae8c14a2f",
        numberPlate: "JPP-69-JPP",
        vin: "4Y1SL65848Z411439",
        location: "ZONE A1",
        state: "Parked",
      }
    );
  }
}
