import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Favourite from "App/Models/Favourite";
import User from "App/Models/User";

export default class FavouritesController {
  public async index({ params, response }) {
    const user_id = params.id;

    const user = await User.findOrFail(user_id);

    await user.load("favourites");

    return response.ok(user.favourites);
  }

  public async find({ params, response }) {
    const favourite = await Favourite.findOrFail(params.id);

    return response.ok(favourite);
  }

  public async insert({ request, response }: HttpContextContract) {
    const favourite = new Favourite();

    await favourite
      .fill({
        userId: request.input("user_id"),
        recipeId: request.input("recipe_id"),
      })
      .save();

    return response.ok(favourite);
  }

  public async delete({ params, response }) {
    const favourite = await Favourite.findOrFail(params.id);
    await favourite.delete();

    return response.ok({ msg: "favourite deleted" });
  }
}
