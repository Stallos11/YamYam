import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "TicketsController.index");
  Route.get("/from/:id", "TicketsController.from");
  Route.get("/total/:period", "TicketsController.getTicketsPer");
  Route.get("/registrations/:period", "TicketsController.getRegistrations");
  Route.get("/:id", "TicketsController.find");

  Route.post("/", "TicketsController.insert");

  Route.put("/:id", "TicketsController.update");

  Route.delete("/:id", "TicketsController.delete");

})
  //   .middleware(["auth", "role:admin"])
  .prefix("/tickets");
