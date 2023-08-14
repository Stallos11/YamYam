import { defineStore } from "pinia";
import { ITicket, ITicketResponse } from "../models/tickets";

interface State {
  isLoading: boolean;
  tickets: ITicket[];
  selectedTicket: ITicket;
  selectedTicketResponses: ITicketResponse[];
}

export const useTicketStore = defineStore("tickets", {
  state: (): State => ({
    isLoading: false,
    tickets: [],
    selectedTicket: {},
    selectedTicketResponses: [],
  }),

  actions: {
    getTicket(id: string) {
      this.isLoading = true

      this.axios
        .get(`tickets/${id}`)
        .then((res) => {
          this.selectedTicket = res.data.ticket
        })
        .catch((err) => console.error(err))
        .finally(() => this.isLoading = false);
    },
    getTicketResponses(id: string) {
      this.isLoading = true

      this.axios
        .get(`tickets/${id}/responses`)
        .then((res) => {
          this.selectedTicketResponses = res.data.responses
        })
        .catch((err) => console.error(err))
        .finally(() => this.isLoading = false);
    },
    getTickets() {
      this.isLoading = true

      this.axios
        .get("tickets")
        .then((res) => {
          this.tickets = res.data
        })
        .catch((err) => console.error(err))
        .finally(() => this.isLoading = false);
    },
    insertResponse(msg: string) {
      this.isLoading = true;

      this.axios
        .post(`tickets/${this.selectedTicket.id}/responses`, {
          msg,
        })
        .then(() => {
          this.getTicketResponses(this.selectedTicket.id as string);
        })
        .catch((err) => console.error(err))
        .finally(() => this.isLoading = false);
    },
    closeTicket(id: string) {
      this.isLoading = true;

      this.axios
        .put(`tickets/${id}`, {
          status: 'closed'
        })
        .then((res) => {
          this.getTickets();

          this.toast.showToast(
            "Info",
            "Ticket closed",
            "bg-dark",
            "bg-dark"
          );
        })
        .catch((err) => console.error(err))
        .finally(() => this.isLoading = false);
    },
  },
});
