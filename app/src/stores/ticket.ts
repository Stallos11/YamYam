import { defineStore } from 'pinia';
import { ITicket } from '../models/ticket';
import { useErrorStore } from './error';
import { useAuthStore } from './auth';

interface State {
  isLoading: boolean;
  tickets?: ITicket[];
  ticketCreate?: Omit<ITicket, 'id' | 'response'>
}

export const useTicketstore = defineStore('tickets', {
  state: (): State => ({
    isLoading: false,
    tickets: [],
    ticketCreate: {
      title: '',
      message: '',
      userId: '',
    }
  }),
  actions: {
    async getTickets() {
      this.isLoading = true;
      const errorStore = useErrorStore();
      const authStore = useAuthStore()

      return await this.axios
        .get(`tickets/from/${authStore.user?.id}`)
        .then((res) => {
          this.tickets = res.data.tickets;
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

      //@ts-ignore
      this.ticketCreate.userId = authStore.user.id

      return await this.axios
        .post('tickets', {
          ticket: this.ticketCreate
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
            message: ''
          }
          this.isLoading = false;
        });
    }
  },
});
