import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { DateTime } from "luxon";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import Recipe from "App/Models/Recipe";
import Favourite from "App/Models/Favourite";

export default class UserSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    await Favourite.updateOrCreateMany("id", [
      {
        id: "be76c4a1-60b5-498e-a25c-eb09da95fdb3",
        userId: "8baa40c3-1eb6-4ee0-a2e7-b0b3df37965a",
        recipeId: "1b2ae1ba-9165-4c09-b65a-a4072caa8680",
      },
    ]);
  }
}
