import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";
import User from "App/Models/User";

const TOKEN_VALIDITY = "1day";
// const TOKEN_TMP_SOCIAL_VALIDITY = "2 mins";

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      const userBody = request.input("user");
      const captchaToken = request.input("token") as string;

      console.log(request);
      const recaptchaResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${Env.get(
          "RECAPTCHA_SECRET_KEY"
        )}&response=${captchaToken}`
      );

      if (!recaptchaResponse.data.success) {
        return response.badRequest({ msg: "Captcha was invalid." });
      }

      const userDB = await User.findBy("email", userBody.email);
      if (userDB && userDB.provider !== "database") {
        return response.movedPermanently(`auth/${userDB.provider}/redirect`);
      } else if (userDB) {
        return response.badRequest({ msg: "User already exist." });
      }

      const user = new User();
      user.fill(userBody);

      await user.save();

      const token = await auth
        .use("api")
        .attempt(userBody.email, userBody.password, {
          expiresIn: TOKEN_VALIDITY,
        });

      return response.send({
        token,
        user: token.user,
      });
    } catch (error) {
      console.error(error.code || error);

      if (error.code == 23505) {
        return response.badRequest({ msg: "Email already used" });
      }

      return response.badRequest({ msg: "Invalid credentials." });
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const body = request.body();
      const captchaToken = request.input("token") as string;
      let email = body.email;
      let password = body.password;

      console.log(request.headers().origin + '/', Env.get('DASHBOARD_URL'))
      if (request.headers().origin + '/' != Env.get("DASHBOARD_URL")) {
        const recaptchaResponse = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${Env.get(
            "RECAPTCHA_SECRET_KEY"
          )}&response=${captchaToken}`
        );

        if (!recaptchaResponse.data.success) {
          return response.badRequest({ msg: "Captcha was invalid." });
        }

        email = body.user.email;
        password = body.user.password;
      }

      const token = await auth.use("api").attempt(email, password, {
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

  /*** Social Auth */
  // public async googleRedirect({ response, ally, logger }: HttpContextContract) {
  //   try {
  //     return ally.use("google").redirect();
  //   } catch (error) {
  //     logger.error({ error }, "Unable to redirect to google oauth.");
  //     return response.badRequest({ msg: error });
  //   }
  // }

  // public async googleCallback({
  //   response,
  //   ally,
  //   auth,
  //   logger,
  // }: HttpContextContract) {
  //   try {
  //     const google = ally.use("google");

  //     if (google.accessDenied()) {
  //       return response.unauthorized({ msg: "Access was denied." });
  //     }

  //     if (google.stateMisMatch()) {
  //       return response.badRequest({ msg: "Request expired. Retry again." });
  //     }

  //     if (google.hasError()) {
  //       return response.badRequest({ msg: google.getError() });
  //     }

  //     const googleUser = await google.user();
  //     if (!googleUser.email) {
  //       return response.badRequest({
  //         msg: "Email returned by Google is not valid.",
  //       });
  //     }

  //     const user = await User.firstOrCreate(
  //       {
  //         email: googleUser.email,
  //       },
  //       {
  //         email: googleUser.email,
  //         provider: "google",
  //       }
  //     );

  //     await user.save();

  //     const token = await auth.use("api").login(user, {
  //       expiresIn: TOKEN_TMP_SOCIAL_VALIDITY,
  //     });

  //     return response.redirect(
  //       `${Env.get("APP_URL")}callback?token=${Buffer.from(
  //         token.token
  //       ).toString("base64")}`
  //     );
  //   } catch (error) {
  //     logger.error(
  //       { error: error?.response?.data || error },
  //       "Unable to handle google oauth callback."
  //     );
  //     return response.badRequest({ msg: error });
  //   }
  // }
}
