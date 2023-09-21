import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeCategory from "App/Models/RecipeCategory";
import Database from "@ioc:Adonis/Lucid/Database";
import Recipe from "App/Models/Recipe";

export default class RecipeCategoriesController {
  /**
   * @swagger
   * /recipe-categories:
   *  get:
   *      tags:
   *       - RecipeCategories
   *      summary: Retrieve all recipe categories
   *      description: Retrieve all recipe categories
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of recipe categories
   *          content:
   *            application/json:
   *              schema:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/RecipeCategory'
   */
  public async index({ response }) {
    const recipeCategories = await RecipeCategory.all();

    return response.ok(recipeCategories);
  }

  /**
   * @swagger
   * /recipe-categories/registrations/{period}:
   *  get:
   *      tags:
   *        - RecipeCategories
   *      summary: Retrieve total recipe categories by period
   *      description: Retrieve total recipe categories by period
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
    let interval = '';

    switch (params.period) {
      case 'day':
        interval = `DATE(created_at)`;
        break;
      case 'month':
        interval = `DATE_FORMAT(created_at, '%Y-%m')`;
        break;
      case 'year':
        interval = `YEAR(created_at)`;
        break;
    }

    const data = await Database.rawQuery(`
      SELECT 
      ${interval} as x,
      COUNT(*) as y 
      FROM recipe_categories 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(data[0]);
  }

  /**
   * @swagger
   * /recipe-categories/total/{period}:
   *  get:
   *      tags:
   *        - RecipeCategories
   *      summary: Retrieve total recipe categories per period
   *      description: Retrieve total recipe categories per period
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
  public async getRecipeCategoriesPer({ params, response }) {
    let interval = '';

    switch (params.period) {
      case 'day':
        interval = `DATE(created_at)`;
        break;
      case 'month':
        interval = `DATE_FORMAT(created_at, '%Y-%m')`;
        break;
      case 'year':
        interval = `YEAR(created_at)`;
        break;
    }

    const items = await Database.rawQuery(`
      SELECT 
      ${interval} as x,
      COUNT(*) as y 
      FROM recipe_categories 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = items[0].map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
  }

  /**
   * @swagger
   * /recipe-categories:
   *  post:
   *      tags:
   *        - RecipeCategories
   *      summary: Create new recipe category
   *      description: Create new recipe category
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *      properties:
   *          recipe_category:
   *            type: string
   *            example: 'Diabétique'
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return recipe category object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeCategory'
   */
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

  /**
   * @swagger
   * /recipe-categories/{id}:
   *  get:
   *      tags:
   *        - RecipeCategories
   *      summary: Retrieve recipe category by id
   *      description: Retrieve recipe category by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Recipe category id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return recipe category object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeCategory'
   */
  public async find({ params, response }) {
    const recipeCategory = await RecipeCategory.findOrFail(params.id);

    const usedBy = (await Recipe.query().where('recipe_category_id', recipeCategory.id)).length

    return response.ok({ ...recipeCategory, usedBy });
  }

  /**
   * @swagger
   * /recipe-categories/{id}:
   *  put:
   *      tags:
   *        - RecipeCategories
   *      summary: Update recipe category by id
   *      description: Update recipe category by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Recipe category id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RecipeCategory'
   *      responses:
   *        200:
   *          description: Return recipe category object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeCategory'
   */
  public async update({ request, params, response }) {
    const body = request.all();

    await RecipeCategory.query().where("id", params.id).update({
      category: body.category,
    });

    const recipeCategory = await RecipeCategory.find(params.id);

    return response.ok(recipeCategory);
  }

  /**
   * @swagger
   * /recipe-categories/{id}:
   *  delete:
   *      tags:
   *        - RecipeCategories
   *      summary: Delete recipe category by id
   *      description: Delete recipe category by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Recipe category id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return recipe category object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeCategory'
   */
  public async delete({ params, response }) {
    const recipeCategory = await RecipeCategory.findOrFail(params.id);
    await recipeCategory.delete();

    return response.ok({ msg: "recipeCategory deleted" });
  }
}
