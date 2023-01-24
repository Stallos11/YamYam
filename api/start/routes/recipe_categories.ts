import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "RecipeCategoriesController.index").name =
    "recipe-categories.index";

  Route.post("/", "RecipeCategoriesController.insert").name =
    "recipe-categories.insert";

  Route.get("/:id", "RecipeCategoriesController.find").name =
    "recipe-categories.find";

  Route.put("/:id", "RecipeCategoriesController.update").name =
    "recipe-categories.update";
})
  //   .middleware(["auth", "role:admin"])
  .prefix("/recipe-categories");
