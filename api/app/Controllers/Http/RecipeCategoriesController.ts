import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeCategory from "App/Models/RecipeCategory";

export default class RecipeCategoriesController {
  public async index({ response }) {
    const recipeCategories = await RecipeCategory.all();

    return response.ok(recipeCategories);
  }

  public async insert({ request, response }: HttpContextContract) {
    const recipeCategory = new RecipeCategory();

    await recipeCategory
      .fill({
        category: request.input("category"),
      })
      .save();

    return response.ok(recipeCategory);
  }

  public async find({ params, response }) {
    const recipeCategory = await RecipeCategory.find(params.id);

    return response.ok(recipeCategory);
  }

  public async update({ request, params, response }) {
    const body = request.all();

    await RecipeCategory.query().where("id", params.id).update({
      category: body.category,
    });

    const recipeCategory = await RecipeCategory.find(params.id);

    return response.ok(recipeCategory);
  }

  public async delete({ params, response }) {
    const recipeCategory = await RecipeCategory.findOrFail(params.id);
    await recipeCategory.delete();

    return response.ok({ msg: "recipeCategory deleted" });
  }
}
