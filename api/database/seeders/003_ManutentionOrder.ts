import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ManutentionOrder from "App/Models/ManutentionOrder";

export default class ManutentionSOrderSeeder extends BaseSeeder {
  public async run() {
    await ManutentionOrder.updateOrCreate(
      { id: "c1eb464f-e029-41f0-a913-3d8e7602367f" },
      {
        id: "c1eb464f-e029-41f0-a913-3d8e7602367f",
        description: "Best description",
        name: "Manutention Order Name",
        state: "Doing",
        vehicleId: "0d0ea5c9-f815-4cfe-9c66-4aaae8c14a2f",
        userId: "34353531-c3a0-4eb9-8b87-28cc3147c5f7",
      }
    );
  }
}
