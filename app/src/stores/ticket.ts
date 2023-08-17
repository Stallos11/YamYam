import { defineStore } from 'pinia';
import { ITicket } from '../models/ticket';
import { useErrorStore } from './error';
import { useAuthStore } from './auth';

interface State {
  isLoading: boolean;
  tickets?: ITicket[];
  ticketCreate?: Omit<ITicket, 'id' | 'response'>;
  selectedTicket: any;
  selectedTicketResponses: any;
}

export const useTicketStore = defineStore('tickets', {
  state: (): State => ({
    isLoading: false,
    tickets: [],
    ticketCreate: {
      title: '',
      message: '',
      userId: '',
    },
    selectedTicket: {},
    selectedTicketResponses: [],
  }),
  actions: {
    async getTicket(id: string) {
      this.isLoading = true;

      this.axios
        .get(`tickets/${id}`)
        .then((res) => {
          this.selectedTicket = res.data.ticket;
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading = false));
    },
    async getTicketResponses(id: string) {
      this.isLoading = true;

      this.axios
        .get(`tickets/${id}/responses`)
        .then((res) => {
          this.selectedTicketResponses = res.data.responses;
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading = false));
    },
    async insertResponse(msg: string) {
      this.isLoading = true;

      this.axios
        .post(`tickets/${this.selectedTicket.id}/responses`, {
          msg,
        })
        .then(() => {
          this.getTicketResponses(this.selectedTicket.id as string);
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading = false));
    },
    async getTickets() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return await this.axios
        .get(`tickets/from`)
        .then((res) => {
          this.tickets = res.data;
        })
        .catch((err) => {
          console.error(err);
          if (err.response) errorStore.setError(err.response.data.msg);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async createTicket() {
      this.isLoading = true;
      const errorStore = useErrorStore();
      const authStore = useAuthStore();

      if ((this.ticketCreate?.message?.length || 0) < 3 || (this.ticketCreate?.title?.length || 0) < 5) return;
      //@ts-ignore
      this.ticketCreate.userId = authStore.user.id;

      return await this.axios
        .post('tickets', {
          ticket: this.ticketCreate,
        })
        .then((res) => {
          this.toast.showToast('Info', res.data.msg, 'blue', '');
        })
        .catch((err) => {
          console.error(err);
          if (err.response) errorStore.setError(err.response.data.msg);
        })
        .finally(() => {
          this.ticketCreate = {
            title: '',
            message: '',
          };
          this.isLoading = false;
        });
    },
  },
});
