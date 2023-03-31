import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Recipe from "App/Models/Recipe";
import Database from "@ioc:Adonis/Lucid/Database";
import Instruction from "App/Models/Instruction";

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

  private convertToSeconds(time: string) {
    const times = time.split(':');
    return +times[0] * 3600 + +times[1] * 60;
  }

  public async insert({ request, response }: HttpContextContract) {

    try {

      const recipe = new Recipe();
      const body = request.all();

      // console.log('fdp', body)
      let recipe_obj = body.recipe.recipe;

      recipe_obj.preparationTime = this.convertToSeconds(recipe_obj.preparationTime);
      recipe_obj.cookingTime = this.convertToSeconds(recipe_obj.cookingTime);
      recipe_obj.eatersAmount = +recipe_obj.eatersAmount

      await recipe.fill(recipe_obj).save();

      const recipe_instructions = body.recipe.instructions;
      recipe_instructions.map(async inst => {
        const instruction = new Instruction();

        const inst_to_save = {
          title: inst.title,
          description: inst.description,
          recipe_id: recipe.id
        }
        await instruction.fill(inst_to_save).save();
      })

      const recipe_ingredient = body.recipe.ingredients;

      recipe_ingredient.map(async ing => {
        const ingr = {
          amount: ing.amount,
          unit: ing.unit,
        }

        await recipe.related('ingredients').sync({ [ing.id]: ingr }, false)
      })

      return response.ok(recipe);
    } catch (err) {
      console.error(err)
    }
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
