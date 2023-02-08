import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UserController {
  public async index({ response }) {
    const users = await User.all();

    return response.ok(users);
  }

  public async getRegistrations({ params, response }) {
    const users = await Database.rawQuery(`
      SELECT 
      DATE_TRUNC('${params.period}', created_at) as x, 
        COUNT(*) as y 
      FROM users 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(users.rows);
  }

  public async getUsersPer({ params, response }) {
    const users = await Database.rawQuery(`
      SELECT 
      (DATE_TRUNC('${params.period}', created_at)) as x,
      COUNT(*) as y 
      FROM users 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = users.rows.map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
  }

  public async getUserDetails({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.load("recipes");
    return response.ok({
      user,
      user_recipes: user.recipes,
    });
  }

  public async delete({ params, response }) {
    const user = await User.findOrFail(params.id);
    await user.delete();

    return response.ok({ msg: "user deleted" });
  }

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
