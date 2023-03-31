import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Recipe from "App/Models/Recipe";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RecipesController {
  public async index({ response }) {
    const recipes = await Recipe.all();

    return response.ok(recipes);
  }

  public async getRegistrations({ params, response }) {
    const recipes = await Database.rawQuery(`
      SELECT 
      DATE_TRUNC('${params.period}', created_at) as x, 
        COUNT(*) as y 
      FROM recipes 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(recipes.rows);
  }

  public async getRecipesPer({ params, response }) {
    const recipes = await Database.rawQuery(`
      SELECT 
      (DATE_TRUNC('${params.period}', created_at)) as x,
      COUNT(*) as y 
      FROM recipes 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = recipes.rows.map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
  }

  public async insert({ request, response }: HttpContextContract) {
    const recipe = new Recipe();
    const body = request.all();

    await recipe
      .fill({
        name: body.name,
        description: body.description,
        preparationTime: body.preparation_time,
        cookingTime: body.cooking_time,
        difficulty: body.difficulty,
        eatersAmount: body.eaters_amount,
        userId: body.userId,
        recipeTypeId: body.recipe_type_id,
        recipeCategoryId: body.recipe_category_id,
      })
      .save()
      .then((e) => console.log("res", e));

    return response.ok(recipe);
  }

  public async find({ params, response }) {
    const recipe = await Recipe.find(params.id);

    return response.ok(recipe);
  }

  public async update({ request, params, response }) {
    const body = request.all();

    await Recipe.query().where("id", params.id).update({
      name: body.name,
      description: body.description,
      preparationTime: body.preparation_time,
      cookingTime: body.cooking_time,
      difficulty: body.difficulty,
      eatersAmount: body.eaters_amount,
      userId: body.userId,
      recipeTypeId: body.recipe_type_id,
      recipeCategoryId: body.recipe_category_id,
    });

    const recipe = await Recipe.find(params.id);

    return response.ok(recipe);
  }

  public async delete({ params, response }) {
    const recipe = await Recipe.findOrFail(params.id);
    await recipe.delete();

    return response.ok({ msg: "recipe deleted" });
  }
}
