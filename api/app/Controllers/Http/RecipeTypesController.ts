import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeType from "App/Models/RecipeType";
import Database from "@ioc:Adonis/Lucid/Database";
import Recipe from "App/Models/Recipe";

export default class RecipeTypesController {

  /**
   * @swagger
   * /recipe-types:
   *  get:
   *      tags:
   *        - RecipeTypes
   *      summary: Retrieve all recipeTypes
   *      description: Retrieve all recipeTypes
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of recipeTypes
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/RecipeType'
   */
  public async index({ response }) {
    const recipeTypes = await RecipeType.all();

    return response.ok(recipeTypes);
  }

  /**
   * @swagger
   * /recipe-types/registrations/{period}:
   *  get:
   *      tags:
   *        - RecipeTypes
   *      summary: Retrieve total recipeTypes by period
   *      description: Retrieve all recipeTypes by period
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

  /**
   * @swagger
   * /recipe-types/total/{period}:
   *  get:
   *      tags:
   *        - RecipeTypes
   *      summary: Retrieve total recipeTypes by period
   *      description: Retrieve total recipeTypes by period
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

  /**
   * @swagger
   * /recipe-types:
   *  post:
   *      tags:
   *        - RecipeTypes
   *      summary: Create a new recipeType
   *      description: Create a new recipeType
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RecipeType'
   *      responses:
   *        200:
   *          description: Return recipeType created
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeType'
   */
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

  /**
   * @swagger
   * /recipe-types/{id}:
   *  get:
   *      tags:
   *        - RecipeTypes
   *      summary: Retrieve a recipeType by id
   *      description: Retrieve a recipeType by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: RecipeType id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return recipeType
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeType'
   */
  public async find({ params, response }) {
    const recipeType = await RecipeType.findOrFail(params.id);

    const usedBy = (await Recipe.query().where('recipe_type_id', recipeType.id)).length

    return response.ok({ ...recipeType, usedBy });
  }

  /**
   * @swagger
   * /recipe-types/{id}:
   *  put:
   *      tags:
   *        - RecipeTypes
   *      summary: Update a recipeType by id
   *      description: Update a recipeType by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: RecipeType id
   *            required: true
   *            schema:
   *              type: string
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RecipeType'
   *      responses:
   *        200:
   *          description: Return recipeType updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeType'
   */
  public async update({ request, params, response }) {
    const body = request.all();

    await RecipeType.query().where("id", params.id).update({
      type: body.type,
    });

    const recipeType = await RecipeType.find(params.id);

    return response.ok(recipeType);
  }

  /**
   * @swagger
   * /recipe-types/{id}:
   *  delete:
   *      tags:
   *        - RecipeTypes
   *      summary: Delete a recipeType by id
   *      description: Delete a recipeType by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: RecipeType id
   *            required: true
   *            schema:
   *              type: string
   *      responses:
   *        200:
   *          description: Return recipeType deleted
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/RecipeType'
   */
  public async delete({ params, response }) {
    const recipeType = await RecipeType.findOrFail(params.id);
    await recipeType.delete();

    return response.ok({ msg: "recipeType deleted" });
  }
}
