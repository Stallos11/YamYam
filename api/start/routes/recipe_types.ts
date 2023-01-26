import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "RecipeTypesController.index").name = "recipe-types.index";

  Route.post("/", "RecipeTypesController.insert").name = "recipe-types.insert";

  Route.get("/:id", "RecipeTypesController.find").name = "recipe-types.find";

  Route.put("/:id", "RecipeTypesController.update").name =
    "recipe-types.update";
})
  //   .middleware(["auth", "role:admin"])
  .prefix("/recipe-types");
