import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { id: "34353531-c3a0-4eb9-8b87-28cc3147c5f7" },
      {
        id: "34353531-c3a0-4eb9-8b87-28cc3147c5f7",
        provider: "database",
        firstname: "a",
        role: "admin",
        email: "a@a.a",
        password: "aaaaaaaa",
      }
    );
  }
}
