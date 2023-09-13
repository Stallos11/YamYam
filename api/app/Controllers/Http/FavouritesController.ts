import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Favourite from "App/Models/Favourite";
import User from "App/Models/User";

export default class FavouritesController {
  public async insert({ auth, params, response }: HttpContextContract) {
    const favourite = new Favourite();

    await favourite
      .fill({
        userId: auth.user.id,
        recipeId: params.id,
      })
      .save();

    return response.ok(favourite);
  }

  public async delete({ auth, params, response }) {
    const favourite = await Favourite.findOrFail(params.id);
    if (favourite.userId != auth.user.id) return response.badRequest({ msg: 'Unauthorized' })
    await favourite.delete();

    return response.ok({ msg: "favourite deleted" });
  }
}
