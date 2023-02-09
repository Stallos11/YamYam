import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "UserController.index");
  Route.get("/total/:period", "UserController.getUsersPer");
  Route.get("/registrations/:period", "UserController.getRegistrations");
  Route.get("/details/:id", "UserController.getUserDetails");

  Route.put("/:id", "UserController.update");

  Route.delete("/:id", "UserController.delete");
})
  //   .middleware(["auth", "role:admin"])
  .prefix("/users");
