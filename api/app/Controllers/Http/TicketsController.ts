import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Ticket from "App/Models/Ticket";

export default class TicketsController {
  public async index({ response }) {
    const tickets = await Ticket.all();

    return response.ok(tickets);
  }

  public async getRegistrations({ params, response }) {
    const tickets = await Database.rawQuery(`
      SELECT 
      DATE_TRUNC('${params.period}', created_at) as x, 
        COUNT(*) as y 
      FROM tickets 
      GROUP BY x
      ORDER BY x
    `);

    return await response.ok(tickets.rows);
  }

  public async getTicketsPer({ params, response }) {
    const tickets = await Database.rawQuery(`
      SELECT 
      (DATE_TRUNC('${params.period}', created_at)) as x,
      COUNT(*) as y 
      FROM tickets 
      GROUP BY x
      ORDER BY x
    `);

    let total = 0;

    const data = tickets.rows.map((row: { x: string; y: string }) => {
      total += parseInt(row.y);

      return {
        x: row.x,
        y: total,
      };
    });

    return response.ok(data);
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

    return response.ok({msg: 'Ticket created'});
  }

  public async find({ params, response }) {
    const ticket = await Ticket.findOrFail(params.id);

    return response.ok({ ticket });
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
