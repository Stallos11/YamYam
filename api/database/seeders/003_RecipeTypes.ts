import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RecipeType from "App/Models/RecipeType";
import { DateTime } from "luxon";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import { RecipeTypeFactory } from "Database/factories";

export default class RecipeTypesSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    const recipe_types = await RecipeTypeFactory.createMany(20);

    await RecipeType.updateOrCreateMany("id", [
      {
        id: "1b2ae1ba-9165-4c09-b65a-a4072caa8680",
        type: "entrée",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "8bb11197-d296-4878-8e2c-340af6ec2ada",
        type: "gâteau",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "91bdd636-8b6f-46f9-a59b-318c1901215b",
        type: "salade",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        id: "2d58f83a-b644-4274-8021-c803d2c49048",
        type: "soupe",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ]);
  }
}
