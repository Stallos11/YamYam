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

  public async delete({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.delete();

    return response.ok({ msg: "user deleted" });
  }
}
