import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "IngredientsController.index");
  Route.get("/:id", "IngredientsController.find");
  Route.get(
    "/openfoodfact/:id",
    "IngredientsController.fetchOpenFoodFactProduct"
  );
  Route.get("/total/:period", "IngredientsController.getIngredientsPer");
  Route.get("/registrations/:period", "IngredientsController.getRegistrations");

  Route.post("/search/:property/:search", "IngredientsController.searchBy");

  Route.put("/:id", "IngredientsController.update");

  Route.delete("/:id", "IngredientsController.delete");
})
  //   .middleware(["auth", "role:admin"])
  .prefix("/ingredients");
