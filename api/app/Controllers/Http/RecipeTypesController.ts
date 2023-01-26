import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeType from "App/Models/RecipeType";

export default class RecipeTypesController {
  public async index({ response }) {
    const recipeTypes = await RecipeType.all();

    return response.ok(recipeTypes);
  }

  public async insert({ request, response }: HttpContextContract) {
    const recipeType = new RecipeType();

    await recipeType
      .fill({
        type: request.input("type"),
      })
      .save();

    return response.ok(recipeType);
  }

  public async find({ params, response }) {
    const recipeType = await RecipeType.find(params.id);

    return response.ok(recipeType);
  }

  public async update({ request, params, response }) {
    const body = request.all();

    await RecipeType.query().where("id", params.id).update({
      type: body.type,
    });

    const recipeType = await RecipeType.find(params.id);

    return response.ok(recipeType);
  }

  public async delete({ params, response }) {
    const recipeType = await RecipeType.findOrFail(params.id);
    await recipeType.delete();

    return response.ok({ msg: "recipeType deleted" });
  }
}
