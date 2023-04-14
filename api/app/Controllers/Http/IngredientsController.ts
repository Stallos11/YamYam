import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Ingredient from "App/Models/Ingredient";
import Database from "@ioc:Adonis/Lucid/Database";
import axios from "axios";

export default class RecipeCategoriesController {
  public async index({ request, response }) {
    // const ingredients = await Ingredient.all();
    const page = request.input("page", 2);
    const limit = 100;

    const ingredients = await Database.from("ingredients").paginate(
      page,
      limit
    );

    return response.ok(ingredients.rows);
  }

  public async searchBy({ params, response }) {
    // const ingredients = await Ingredient.all();

    const ingredients = await Ingredient.query().whereLike(
      params.property ? params.property : "product_name",
      `%${params.search.replace(/%20/g, " ")}%`
    );

    return response.ok(ingredients);
  }

  fetchOpenFoodFactProduct({ params, response }) {
    return axios
      .get(`https://world.openfoodfacts.org/api/v0/product/9501100305091.json`)
      .then((res) => response.send(res))
      .catch((err) => console.error(err));
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

  public async getIngredientsPer({ params, response }) {
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

  public async insert({ request, response }: HttpContextContract) {
    const ingredient = new Ingredient();
    const body = request.all();

    await ingredient
      .fill({
        openfoodfact_id: body.openfoodfact_id,
        product_name: body.product_name,
        product_name_fr: body.product_name_fr,
        product_name_en: body.product_name_en,
        product_name_de: body.product_name_de,
      })
      .save();

    return response.ok(ingredient);
  }

  public async find({ params, response }) {
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

  public async delete({ params, response }) {
    const ingredient = await Ingredient.findOrFail(params.id);
    await ingredient.delete();

    return response.ok({ msg: "ingredient deleted" });
  }
}
