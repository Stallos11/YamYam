import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeType from "App/Models/RecipeType";
import Database from "@ioc:Adonis/Lucid/Database";
import Recipe from "App/Models/Recipe";

export default class RecipeTypesController {
  public async index({ response }) {
    const recipeTypes = await RecipeType.all();

    return response.ok(recipeTypes);
  }

  public async getRegistrations({ params, response }) {
    const recipe_types = await Database.rawQuery(`
      SELECT 
      DATE_TRUNC('${params.period}', created_at) as x, 
        COUNT(*) as y 
      FROM recipe_types 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(recipe_types.rows);
  }

  public async getRecipeTypesPer({ params, response }) {
    const recipe_types = await Database.rawQuery(`
      SELECT 
      (DATE_TRUNC('${params.period}', created_at)) as x,
      COUNT(*) as y 
      FROM recipe_types 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = recipe_types.rows.map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
  }

  public async insert({ request, response }: HttpContextContract) {
    const recipeType = new RecipeType();
    const body = request.all();

    await recipeType
      .fill({
        type: body.recipe_type,
      })
      .save();

    return response.ok(recipeType);
  }

  public async find({ params, response }) {
    const recipeType = await RecipeType.findOrFail(params.id);

    const usedBy = (await Recipe.query().where('recipeTypeId', recipeType.id)).length

    return response.ok({ ...recipeType, usedBy });
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
