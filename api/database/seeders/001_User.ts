import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { id: "34353531-c3a0-4eb9-8b87-28cc3147c5f7" },
      {
        id: "34353531-c3a0-4eb9-8b87-28cc3147c5f7",
        email: "jo@jo.jo",
        password: "joji",
        firstname: "Jo",
        lastname: "CKEY",
        role: "JOCKEY",
      }
    );

    await User.updateOrCreate(
      { id: "e8061ed4-2ac3-433a-8260-4e71b4074c2f" },
      {
        id: "e8061ed4-2ac3-433a-8260-4e71b4074c2f",
        email: "ad@ad.ad",
        password: "adad",
        firstname: "ad",
        lastname: "MIN",
        role: "ADMIN",
      }
    );

    await User.updateOrCreate(
      { id: "e5194898-0ac6-4c2b-a769-cb1a275ee5e8" },
      {
        id: "e5194898-0ac6-4c2b-a769-cb1a275ee5e8",
        email: "lo@lo.lo",
        password: "lolo",
        firstname: "Logi",
        lastname: "STICIAN",
        role: "LOGISTICIAN",
      }
    );
  }
}
