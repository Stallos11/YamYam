import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";

export default class UserSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    await User.updateOrCreateMany("id", [
      {
        id: "34353531-c3a0-4eb9-8b87-28cc3147c5f7",
        provider: "database",
        firstname: "a",
        role: "admin",
        email: "a@a.a",
        password: "aaaaaaaa",
      },
      {
        id: "8baa40c3-1eb6-4ee0-a2e7-b0b3df37965a",
        provider: "database",
        firstname: "b",
        role: "user",
        email: "b@b.b",
        password: "bbbbbbbb",
      },
    ]);
  }
}
