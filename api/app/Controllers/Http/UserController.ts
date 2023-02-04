import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { DateTime } from "luxon";

export default class UserController {
  public async index({ response }) {
    const users = await User.all();

    return response.ok(users);
  }

  public async getRegistrations({ params, response }) {
    var today = new Date();
    var daysBefore = params.daysBefore;
    var priorDate = new Date(new Date().setDate(today.getDate() - daysBefore));

    const users = await User.query()
      .whereBetween("created_at", [priorDate, today])
      .orderBy("created_at", "asc");

    return await response.ok(users);
  }

  public async getUserDetails({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.load("recipes");
    return response.ok({
      user_recipes: user.recipes,
    });
  }

  // public async find({ params, response }) {
  //   const recipe = await Recipe.find(params.id);

  //   return response.ok(recipe);
  // }

  // public async update({ request, params, response }) {
  //   const body = request.all();

  //   await Recipe.query().where("id", params.id).update({
  //     name: body.name,
  //     description: body.description,
  //     preparationTime: body.preparation_time,
  //     cookingTime: body.cooking_time,
  //     difficulty: body.difficulty,
  //     eatersAmount: body.eaters_amount,
  //     userId: body.userId,
  //     recipeTypeId: body.recipe_type_id,
  //     recipeCategoryId: body.recipe_category_id,
  //   });

  //   const recipe = await Recipe.find(params.id);

  //   return response.ok(recipe);
  // }

  // public async delete({ params, response }) {
  //   const recipe = await Recipe.findOrFail(params.id);
  //   await recipe.delete();

  //   return response.ok({ msg: "recipe deleted" });
  // }
}
