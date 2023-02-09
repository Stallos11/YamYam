import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "RecipeCategoriesController.index");
  Route.get("/:id", "RecipeCategoriesController.find");
  Route.get("/total/:period", "RecipeCategoriesController.getRecipeCategoriesPer");
  Route.get("/registrations/:period", "RecipeCategoriesController.getRegistrations");

  Route.post("/", "RecipeCategoriesController.insert");

  Route.put("/:id", "RecipeCategoriesController.update");

  Route.delete("/:id", "RecipeCategoriesController.delete");

})
  //   .middleware(["auth", "role:admin"])
  .prefix("/recipe-categories");
