import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "UserController.index").name = "user.index";
  Route.get("/get-users-per/:period", "UserController.getUsersPer").name =
    "user.getUsersPer";
  Route.get(
    "/registrations/:daysBefore",
    "UserController.getRegistrations"
  ).name = "user.getRegistrations";
  Route.get("/details/:id", "UserController.getUserDetails").name =
    "user.getUserDetails";
  // Route.post("/", "RecipesController.insert").name = "recipe.insert";

  // Route.get("/:id", "RecipesController.find").name = "recipe.find";

  // Route.put("/:id", "RecipesController.update").name =
  //   "recipe.update";

  Route.delete("/:id", "UserController.delete").name = "user.delete";
})
  //   .middleware(["auth", "role:admin"])
  .prefix("/users");
