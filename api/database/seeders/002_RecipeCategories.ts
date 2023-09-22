import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RecipeCategory from "App/Models/RecipeCategory";
import { DateTime } from "luxon";

import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";

export default class UserSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    await RecipeCategory.updateOrCreateMany("id", [
      {
        id: "1b2ae1ba-9165-4c09-b65a-a4072caa8680",
        category: "Fitness",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "8bb11197-d296-4878-8e2c-340af6ec2ada",
        category: "Cheat meal",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "91bdd636-8b6f-46f9-a59b-318c1901215b",
        category: "Sans sucre",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "2d58f83a-b644-4274-8021-c803d2c49048",
        category: "Encas",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ]);
  }
}
