import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UserController {
  /**
   * @swagger
   * /users:
   *  get:
   *      tags:
   *        - Users
   *      summary: Retrieve all users
   *      description: Retrieve all users
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return array of users
   *          content:
   *            application/json:
   *              schema:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/User'
   */
  public async index({ response }) {
    const users = await User.all();

    return response.ok(users);
  }

  /**
   * @swagger
   * /users/total/{period}:
   *  get:
   *      tags:
   *        - Users
   *      summary: Retrieve total users by period
   *      description: Retrieve all users by period
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

    const users = await Database.rawQuery(`
      SELECT 
      ${interval} as x,
      COUNT(*) as y 
      FROM users 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(users[0]);
  }

  /**
   * @swagger
   * /users/registrations/{period}:
   *  get:
   *      tags:
   *        - Users
   *      summary: Retrieve user registrations by period
   *      description: Retrieve user registrations by period
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
   *                properties:
   *                  data:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/ChartResponse'
   */
  public async getUsersPer({ params, response }) {
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
    const users = await Database.rawQuery(`
      SELECT 
      ${interval} as x,
      COUNT(*) as y 
      FROM users 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = users[0].map((row: { x: string; y: string }) => {
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
   * /users/details/{id}:
   *  get:
   *      tags:
   *        - Users
   *      summary: Retrieve user details by id
   *      description: Retrieve user details by id
   *      parameters:
   *          - name: id
   *            in: path
   *            description: id
   *            required: true
   *            schema:
   *              type: string
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Return user
   *          content:
   *            application/json:
   *              schema:
   *                properties:
   *                  data:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   */
  public async getUserDetails({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.load("recipes");
    await user.load('favourites');
    return response.ok({
      user,
      user_recipes: user.recipes,
      user_favourites: user.favourites
    });
  }

  public async delete({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.delete();

    return response.ok({ msg: "Utilisateur supprimé" });
  }

  /**
   * @swagger
   * /users/update:
   *  get:
   *      tags:
   *        - Users
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            description: User payload
   *            schema:
   *              type: object
   *              properties:
   *                phone:
   *                  type: string
   *                  example: 'James Bond'
   *                  required: true
   *                email:
   *                  type: string
   *                  example: 'Bond007@example.com'
   *                  required: true
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  public async update({ request, params, response }) {
    const body = request.all();

    await User.query().where("id", params.id).update({
      firstname: body.firstname,
      email: body.email,
    });

    const user = await User.find(params.id);

    return response.ok(user);
  }
}
