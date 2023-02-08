import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";

const TOKEN_VALIDITY = "1day";

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      const body = request.body();

      const user = new User();
      user.fill(body);

      await user.save();

      const token = await auth.use("api").attempt(body.email, body.password, {
        expiresIn: TOKEN_VALIDITY,
      });

      return response.send({
        token,
        user: token.user,
      });
    } catch (error) {
      console.error(error.code);

      if (error.code == 23505) {
        return response.badRequest({ msg: "Email already used" });
      }

      return response.badRequest({ msg: "Invalid credentials." });
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const body = request.body();
      const token = await auth.use("api").attempt(body.email, body.password, {
        expiresIn: TOKEN_VALIDITY,
      });

      return response.send({
        token,
        user: token.user,
      });
    } catch {
      return response.badRequest({ msg: "Invalid credentials." });
    }
  }

  public async logout({ auth, response }) {
    await auth.use("api").logout();

    return response.ok({ success: true });
  }
}
