import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RecipeRepository from 'App/Repositories/RecipeRepository';
import { inject } from '@adonisjs/core/build/standalone';
import Setting from 'App/Models/Setting';

@inject()
export default class RecipesController {
  constructor(private recipeRepository: RecipeRepository) {}

  /**
   * @swagger
   * /recipes:
   *  get:
   *      tags:
   *        - Recipes
   *      summary: Retrieve all recipes
   *      description: Retrieve all recipes
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of recipes
   *          content:
   *            application/json:
   *              schema:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/Recipe'
   */
  public async index({ response }) {
    let recipes = await this.recipeRepository.index();

    return response.ok(recipes);
  }

  public async favourites({ auth, response }) {
    const recipes = await this.recipeRepository.favourites(auth.user);

    return response.ok(recipes);
  }


  /**
   * @swagger
   * /recipes/registrations/{period}:
   *  get:
   *      tags:
   *        - Recipes
   *      summary: Retrieve total recipes by period
   *      description: Retrieve all recipes by period
   *      parameters:
   *          - name: period
   *            in: path
   *            description: Period
   *            required: true
   *            schema:
   *              type: string
   *              enum: ['day', 'week', 'month', 'year']
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of objects
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/ChartResponse'
   */
  public async getRegistrations({ params, response }) {
    const recipes = await this.recipeRepository.getRegistrations(params.period);

    return response.ok(recipes);
  }

  /**
   * @swagger
   * /recipes/total/{period}:
   *  get:
   *      tags:
   *        - Recipes
   *      summary: Retrieve recipes per period
   *      description: Retrieve recipes per period
   *      parameters:
   *          - name: period
   *            in: path
   *            description: Period
   *            required: true
   *            schema: 
   *              type: string
   *              enum: ['day', 'week', 'month', 'year']
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of objects
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Recipe'
   */
  public async getRecipesPer({ params, response }) {
    const data = await this.recipeRepository.getRecipesPer(params.period);

    return response.ok(data);
  }

  /**
   * @swagger
   * /recipes:
   *  post:
   *      tags:
   *        - Recipes
   *      summary: Create new recipe
   *      description: Create new recipe
   *      produces:
   *        - application/json
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Recipe'
   *        responses:
   *          200:
   *            description: Return recipe object
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Recipe'
   */
  public async insert({ request, response }: HttpContextContract) {
    const body = request.all();
    const defimg = (await Setting.firstOrFail()).defaultRecipeImage;

    let file = null;
    if (request.allFiles().recipe) {
      file = request.allFiles().recipe.recipe.image;
    }

    const recipe = await this.recipeRepository.insert(body, file || defimg);

    return response.ok(recipe);
  }

  /**
   * @swagger
   * /recipes/{id}:
   *  get:
   *      tags:
   *        - Recipes
   *      summary: Retrieve recipe by id
   *      description: Retrieve recipe by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Recipe id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return recipe object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Recipe'
   */
  public async find({ params, response }) {
    const recipe = await this.recipeRepository.find(params.id);

    await recipe.load('favourites');
    await recipe.load('instructions');

    return response.ok(recipe);
  }

  /**
   * @swagger
   * /recipes/{id}:
   *  put:
   *      tags:
   *        - Recipes
   *      summary: Update recipe by id
   *      description: Update recipe by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Recipe id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Recipe'
   *      responses:
   *        200:
   *          description: Return recipe object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Recipe'
   */
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.all();
    const id = params.id;
    const recipe = await this.recipeRepository.update(id, body);

    return response.ok(recipe);
  }

  /**
   * @swagger
   * /recipes/{id}:
   *  delete:
   *      tags:
   *        - Recipes
   *      summary: Delete recipe by id
   *      description: Delete recipe by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Recipe id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return recipe object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Recipe'
   */
  public async delete({ params, response }) {
    const recipe_id = params.id;
    const recipe = await this.recipeRepository.delete(recipe_id);

    return response.ok(recipe);
  }
}
