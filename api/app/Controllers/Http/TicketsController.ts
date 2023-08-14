import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Ticket from "App/Models/Ticket";
import TicketResponse from "App/Models/TicketResponse";

export default class TicketsController {
  public async index({ response }) {
    const tickets = await Ticket.all();

    return response.ok(tickets);
  }

  public async insert({ request, response }: HttpContextContract) {
    const ticket = new Ticket();
    const body = request.all();

    await ticket
      .fill({
        title: body.ticket.title,
        message: body.ticket.message,
        status: 'in progress',
        userId: body.ticket.userId
      })
      .save();

    return response.ok({ msg: 'Ticket created' });
  }

  public async insertResponse({ auth, request, response }: HttpContextContract) {

    const ticketResponse = new TicketResponse();

    ticketResponse.ticketId = request.params().id;
    ticketResponse.userId = auth.user?.id as string;
    ticketResponse.message = request.body().msg;

    await ticketResponse.save();

    return response.ok({ msg: 'Response sent' });
  }

  public async find({ params, response }) {
    const ticket = await Ticket.findOrFail(params.id);

    return response.ok({ ticket });
  }

  public async responses({ params, response }) {
    const ticket = await Ticket.findOrFail(params.id);

    await ticket.load('responses');

    return response.ok({ responses: ticket.responses });
  }

  public async from({ params, response }) {
    const tickets = await Ticket.query().where('user_id', params.id);

    return response.ok({ tickets });
  }

  public async update({ request, params, response }) {
    const body = request.all();

    await Ticket.query().where("id", params.id).update({
      type: body.type,
    });

    const ticket = await Ticket.find(params.id);

    return response.ok(ticket);
  }

  public async delete({ params, response }) {
    const ticket = await Ticket.findOrFail(params.id);
    await ticket.delete();

    return response.ok({ msg: "ticket deleted" });
  }
}
