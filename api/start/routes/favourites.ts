import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/:id", "FavouritesController.insert").name = "favourites.insert";
  Route.delete("/:id", "FavouritesController.delete").name =
    "favourites.delete";
})
  .middleware(["auth"])
  .prefix("/favourites");
