import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeComment from "App/Models/RecipeComment";
import User from "App/Models/User";

export default class RecipeCommentController {

  public async list({ params, response }) {
    const comments = await RecipeComment.query().where('recipe_id', params.id).preload('user');
    return response.ok(comments);
  }

  public async insert({ auth, params, request, response }: HttpContextContract) {
    const recipeComment = new RecipeComment();
    const body = request.all();

    await recipeComment
      .fill({
        message: body.message,
        stars: body.stars,
        userId: auth.user?.id,
        recipeId: params.id
      })
      .save();

    return response.ok(recipeComment);
  }

  public async delete({ auth, params, response }) {
    const comment = await RecipeComment.findOrFail(params.id);
    const adminUser = await User.query().where('email', 'admin@admin.com').firstOrFail();

    if ((auth.user.id === adminUser.id) || (comment.userId != auth.user?.id)) {
      await comment.delete();
    } else {
      return response.badRequest({ msg: 'Accès interdit' });
    }

    return response.ok({ msg: "Commentaire supprimé" });
  }
}
