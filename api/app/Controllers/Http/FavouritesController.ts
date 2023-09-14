import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Favourite from "App/Models/Favourite";
import User from "App/Models/User";

export default class FavouritesController {
  /**
   * @swagger
   * /favourites/index/{id}:
   *  get:
   *      tags:
   *        - Favourites
   *      summary: Retrieve all favourites by user id
   *      description: Retrieve all favourites by user id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: User id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of favourites
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Favourite'
   */
  public async index({ params, response }) {
    const user_id = params.id;

    const user = await User.findOrFail(user_id);

    await user.load("favourites");

    return response.ok(user.favourites);
  }

  /**
   * @swagger
   * /favourites/find/{id}:
   *  get:
   *      tags:
   *        - Favourites
   *      summary: Retrieve favourite by id
   *      description: Retrieve favourite by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Favourite id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return favourite object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Favourite'
   */
  public async find({ params, response }) {
    const favourite = await Favourite.findOrFail(params.id);

    return response.ok(favourite);
  }

  /**
   * @swagger
   * /favourites:
   *  post:
   *      tags:
   *        - Favourites
   *      summary: Create new favourite
   *      description: Create new favourite
   *      produces:
   *        - application/json
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Favourite'
   *      responses:
   *        200:
   *          description: Return favourite object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Favourite'
   */
  public async insert({ auth, params, response }: HttpContextContract) {
    const favourite = new Favourite();

    await favourite
      .fill({
        userId: auth.user?.id,
        recipeId: params.id,
      })
      .save();

    return response.ok(favourite);
  }

  /**
   * @swagger
   * /favourites/{id}:
   *  delete:
   *      tags:
   *        - Favourites
   *      summary: Delete favourite by id
   *      description: Delete favourite by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: Favourite id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return favourite object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Favourite'
   */
  public async delete({ auth, params, response }: HttpContextContract) {
    const favourite = await Favourite.findOrFail(params.id);
    if (favourite.userId != auth.user?.id) return response.badRequest({ msg: 'Unauthorized' })
    await favourite.delete();

    return response.ok({ msg: "favourite deleted" });
  }
}
