import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeCategory from "App/Models/RecipeCategory";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RecipeCategoriesController {
  public async index({ response }) {
    const recipeCategories = await RecipeCategory.all();

    return response.ok(recipeCategories);
  }

  public async getRegistrations({ params, response }) {
    const recipe_categories = await Database.rawQuery(`
      SELECT 
      DATE_TRUNC('${params.period}', created_at) as x, 
        COUNT(*) as y 
      FROM recipe_categories 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(recipe_categories.rows);
  }

  public async getRecipeCategoriesPer({ params, response }) {
    const recipe_categories = await Database.rawQuery(`
      SELECT 
      (DATE_TRUNC('${params.period}', created_at)) as x,
      COUNT(*) as y 
      FROM recipe_categories 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = recipe_categories.rows.map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
  }

  public async insert({ request, response }: HttpContextContract) {
    const recipeCategory = new RecipeCategory();
    const body = request.all();
    
    await recipeCategory
      .fill({
        category: body.recipe_category,
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
