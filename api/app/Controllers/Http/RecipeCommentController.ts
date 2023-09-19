import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RecipeComment from "App/Models/RecipeComment";

export default class RecipeCommentController {

  public async list({ params, response }) {
    const comments = await RecipeComment.query().where('recipe_id', params.id);
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

    if (comment.userId != auth.user?.id) return response.badRequest({ msg: 'Unauthaurized' });
    await comment.delete();
    return response.ok({ msg: "Comment deleted" });
  }
}
