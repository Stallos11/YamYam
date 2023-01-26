import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { DateTime } from "luxon";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import Recipe from "App/Models/Recipe";

export default class UserSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    await Recipe.updateOrCreateMany("id", [
      {
        id: "1b2ae1ba-9165-4c09-b65a-a4072caa8680",
        name: "Recette de pgm",
        description: "La best recette",
        preparationTime: 600,
        cookingTime: 1200,
        difficulty: 4,
        eatersAmount: 12,
        userId: "8baa40c3-1eb6-4ee0-a2e7-b0b3df37965a",
        recipeTypeId: "1b2ae1ba-9165-4c09-b65a-a4072caa8680",
        recipeCategoryId: "8bb11197-d296-4878-8e2c-340af6ec2ada",
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ]);
  }
}
