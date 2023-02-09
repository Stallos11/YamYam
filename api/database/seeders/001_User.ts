import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import { DateTime } from "luxon";
import { UserFactory } from "Database/factories";
export default class UserSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    const users = await UserFactory.createMany(100);

    await User.updateOrCreateMany("id", [
      {
        id: "34353531-c3a0-4eb9-8b87-28cc3147c5f7",
        provider: "database",
        firstname: "a",
        role: "admin",
        email: "admin@admin.com",
        password: "!Admin31",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "8baa40c3-1eb6-4ee0-a2e7-b0b3df37965a",
        provider: "database",
        firstname: "b",
        role: "user",
        email: "b@b.b",
        password: "bbbbbbbb",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ]);
  }
}
