import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Ingredient from "App/Models/Ingredient";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RecipeCategoriesController {
  public async searchBy({ request, params, response }: HttpContextContract) {
    // const ingredients = await Ingredient.all();
    const ingredients = await Ingredient.query().whereLike(
      params.property ? params.property : "product_name",
      `%${request.body().search.replace(/%20/g, " ")}%`
    );

    return response.ok(ingredients);
  }

  public async getRegistrations({ params, response }) {
    const ingredients = await Database.rawQuery(`
      SELECT 
      DATE_TRUNC('${params.period}', created_at) as x, 
        COUNT(*) as y 
      FROM ingredients 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(ingredients.rows);
  }

  public async getIngredientsPer({ params, response }: HttpContextContract) {
    const ingredients = await Database.rawQuery(`
      SELECT 
      (DATE_TRUNC('${params.period}', created_at)) as x,
      COUNT(*) as y 
      FROM ingredients 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = ingredients.rows.map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
  }

  public async find({ params, response }: HttpContextContract) {
    const ingredient = await Ingredient.find(params.id);

    return response.ok(ingredient);
  }

  public async update({ request, params, response }) {
    const body = request.all();

    await Ingredient.query().where("id", params.id).update({
      category: body.category,
    });

    const ingredient = await Ingredient.find(params.id);

    return response.ok(ingredient);
  }

  public async delete({ params, response }: HttpContextContract) {
    const ingredient = await Ingredient.findOrFail(params.id);
    await ingredient.delete();

    return response.ok({ msg: "ingredient deleted" });
  }
}
