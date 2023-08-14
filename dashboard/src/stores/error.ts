import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

interface State {
  error: string;
}

export const useErrorStore = defineStore('error', {
  state: (): State => ({
    error: '',
  }),
  actions: {
    setError(error: string, forceToast = false) {
      this.error = error;
      if (!useAuthStore().isLoggedIn && !forceToast) return;

      this.toast.showToast('Error', error, 'red', 'black');
    },
  },
});
