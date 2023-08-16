import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "TicketsController.index");
  Route.get("/from", "TicketsController.getTicketsByUser");
  Route.get("/:id", "TicketsController.find");
  Route.get("/:id/responses", "TicketsController.responses");

  Route.post("/:id/responses", "TicketsController.insertResponse");
  Route.post("/", "TicketsController.insert");

  Route.put("/:id", "TicketsController.update");
})
  .middleware(["auth"])
  .prefix("/tickets");
