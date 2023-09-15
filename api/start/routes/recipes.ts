import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/', 'RecipesController.index').name = 'recipe.index';
  Route.get('/favourites', 'RecipesController.favourites').name =
    'recipe.favourites';
    Route.get('/user-recipes', 'RecipesController.userRecipes');
  Route.get('/:id', 'RecipesController.find').name = 'recipe.find';
  Route.get('/total/:period', 'RecipesController.getRecipesPer');
  Route.get('/registrations/:period', 'RecipesController.getRegistrations');

  Route.post('/', 'RecipesController.insert').name = 'recipe.insert';

  Route.put('/:id', 'RecipesController.update').name = 'recipe.update';

  Route.delete('/:id', 'RecipesController.delete').name = 'recipe.delete';

  //
})
  .middleware(['auth'])
  .prefix('/recipes');
