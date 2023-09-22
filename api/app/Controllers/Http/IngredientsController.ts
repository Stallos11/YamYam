import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Ingredient from "App/Models/Ingredient";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RecipeCategoriesController {

  /**
   * @swagger
   * /ingredients:
   *  get:
   *      tags:
   *        - Ingredients
   *      summary: Retrieve all ingredients
   *      description: Retrieve all ingredients
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of ingredients
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Ingredient'
   */
  public async index({ request, response }) {
    // const ingredients = await Ingredient.all();
    const page = request.input("page", 2);
    const limit = 100;

    const ingredients = await Database.from("ingredients").paginate(
      page,
      limit
    );

    //@ts-ignore
    return response.ok(ingredients[0]);
  }

  /**
   * @swagger
   * /ingredients/search/{property}/{search}:
   *  get:
   *      tags:
   *        - Ingredients
   *      summary: Search ingredients by property
   *      description: Search ingredients by property
   *      parameters:
   *          - name: property
   *            in: path
   *            description: Property
   *            required: true
   *            schema:
   *              type: string
   *              enum: ['product_name', 'product_name_fr', 'product_name_en', 'product_name_de']
   *          - name: search
   *            in: path
   *            description: Search
   *            required: true
   *            schema:
   *              type: string
   *              example: 'sucre'
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of ingredients
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Ingredient'
   */
  public async searchBy({ request, params, response }: HttpContextContract) {
    // const ingredients = await Ingredient.all();

    // const ingredients = await Ingredient.query().whereLike(
    //   params.property ? params.property : "product_name",
    //   `%${request.body().search.replace(/%20/g, " ")}%`, 
    // );

    const ingredients = await Database.rawQuery(`select * from ingredients where ingredients.${params.property ? params.property : "product_name"} like '%${request.body().search.replace(/%20/g, ' ')}%'; `)

    return response.ok(ingredients[0]);
  }

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
      FROM ingredients 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(data[0]);
  }

  /**
   * @swagger
   * /ingredients/total/{period}:
   *  get:
   *      tags:
   *        - Ingredients
   *      summary: Retrieve total ingredients by period
   *      description: Retrieve total ingredients by period
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
  public async getIngredientsPer({ params, response }: HttpContextContract) {
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
      FROM ingredients 
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
   * /ingredients/{id}:
   *  get:
   *      tags:
   *        - Ingredients
   *      summary: Retrieve ingredient by id
   *      description: Retrieve ingredient by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Ingredient id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return ingredient object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Ingredient'
   */
  public async find({ params, response }: HttpContextContract) {
    const ingredient = await Ingredient.find(params.id);

    return response.ok(ingredient);
  }

  /**
   * @swagger
   * /ingredients/{id}:
   *  delete:
   *      tags:
   *        - Ingredients
   *      summary: Delete ingredient by id
   *      description: Delete ingredient by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Ingredient id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return ingredient object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Ingredient'
   */
  public async delete({ params, response }: HttpContextContract) {
    const ingredient = await Ingredient.findOrFail(params.id);
    await ingredient.delete();

    return response.ok({ msg: "Ingrédient supprimé" });
  }
}
