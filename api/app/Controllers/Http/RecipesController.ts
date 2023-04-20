import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeRepository from "App/Repositories/RecipeRepository";
import { inject } from "@adonisjs/core/build/standalone";

@inject()
export default class RecipesController {
  constructor(private recipeRepository: RecipeRepository) { }

  public async index({ response }) {
    const recipes = await this.recipeRepository.index();

    return response.ok(recipes);
  }

  public async getRegistrations({ params, response }) {
    const recipes = await this.recipeRepository.getRegistrations(params.period)

    return response.ok(recipes);
  }

  public async getRecipesPer({ params, response }) {
    const data = await this.recipeRepository.getRecipesPer(params.period)

    return response.ok(data);
  }

  public async insert({ request, response }: HttpContextContract) {
    const body = request.all();
    const recipe = await this.recipeRepository.insert(body);

    return response.ok(recipe);
  }

  public async find({ params, response }) {
    const recipe = await this.recipeRepository.find(params.id);

    await recipe.load('favourites');
    await recipe.load('instructions');

    return response.ok(recipe);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const body = request.all();
    const id = params.id;
    const recipe = await this.recipeRepository.update(id, body);

    return response.ok(recipe);
  }

  public async delete({ params, response }) {
    const recipe_id = params.id;
    const recipe = await this.recipeRepository.delete(recipe_id)

    return response.ok(recipe);
  }
}
