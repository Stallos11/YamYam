import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "RecipeTypesController.index");
  Route.get("/:id", "RecipeTypesController.find");
  Route.get("/total/:period", "RecipeTypesController.getRecipeTypesPer");
  Route.get("/registrations/:period", "RecipeTypesController.getRegistrations");

  Route.post("/", "RecipeTypesController.insert");

  Route.put("/:id", "RecipeTypesController.update");

  Route.delete("/:id", "RecipeTypesController.delete");

})
  //   .middleware(["auth", "role:admin"])
  .prefix("/recipe-types");
