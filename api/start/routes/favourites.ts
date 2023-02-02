import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/find/:id", "FavouritesController.find").name = "favourites.find";
  Route.get("/index/:id", "FavouritesController.index").name =
    "favourites.index";

  Route.post("/", "FavouritesController.insert").name = "favourites.insert";

  Route.delete("/:id", "FavouritesController.delete").name =
    "favourites.delete";
})
  //   .middleware(["auth", "role:admin"])
  .prefix("/favourites");
