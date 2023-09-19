import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/:id', 'RecipeCommentController.list')
  Route.post('/:id', 'RecipeCommentController.insert')
  Route.delete('/:id', 'RecipeCommentController.delete')
})
  .middleware(['auth'])
  .prefix('/recipe-comments');
