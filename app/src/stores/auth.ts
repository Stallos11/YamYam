import { defineStore } from 'pinia';
import { User } from '../models/user';
import { useErrorStore } from './error';
import { useUserStore } from './user';

interface State {
  isLoading: boolean;
  user?: User;
  token?: {
    token?: string;
    expires_at?: Date;
    type?: string;
  };
  successMsg?: string;
}

export const useAuthStore = defineStore('auth', {
  persist: {
    storage: localStorage,
  },
  state: (): State => ({
    isLoading: false,
    user: {},
    token: {},
    successMsg: '',
  }),
  getters: {
    isLoggedIn(state) {
      return state.user && !!state.user.id;
    },
  },
  actions: {
    clearAuthData() {
      this.user = {};
      this.token = {};

      this.axios.defaults.headers.common = {};

      const userStore = useUserStore();
      clearInterval(userStore.balanceIntervalId);
      userStore.balanceIntervalId = undefined;
    },
    async login(user: User, token: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post('auth/login', { user, token })
        .then((res) => {
          if (res.data) {
            this.user = res.data.user;
            this.token = res.data.token;

            this.axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token.token}`;
            this.router.push('/');
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            if (err.response.data && err.response.status === 301)
              return (document.location.href = `${this.axios.defaults.baseURL}${err.response.data}`);

            errorStore.setError(err.response.data.msg, true);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async register(user: User, token: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post('auth/register', { user, token })
        .then((res) => {
          if (res.data) {
            this.user = res.data.user;
            this.token = res.data.token;

            this.axios.defaults.headers.common = {
              Authorization: `Bearer ${res.data.token.token}`,
            };

            this.router.push('/');
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            if (err.response.data && err.response.status === 301)
              return (document.location.href = `${this.axios.defaults.baseURL}${err.response.data}`);

            errorStore.setError(err.response.data.msg, true);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    redirectWithSocial(auth: 'google' | 'discord') {
      this.isLoading = true;
      useErrorStore().error = '';

      document.location.href = `${this.axios.defaults.baseURL}auth/${auth}/redirect`;
      this.isLoading = false;
    },
    async getUserByToken(token: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post('auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data) {
            this.user = res.data.user;
            this.token = res.data.token;

            this.axios.defaults.headers.common = {
              Authorization: `Bearer ${res.data.token.token}`,
            };

            this.router.push('/');
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) errorStore.setError(err.response.data.msg);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async logout() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post('auth/logout')
        .then((res) => {
          if (res.data) {
            this.clearAuthData();
            this.router.push('/');
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) errorStore.setError(err.response.data.msg);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async forgotPassword(email: string, token: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post('auth/forgot-password', { email, token })
        .then((res) => {
          if (res.data) {
            this.toast.showToast('Info', res.data.msg, 'blue', '');
            this.router.push({ name: 'login' });
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            if (err.response.data && err.response.status === 301)
              return (document.location.href = `${this.axios.defaults.baseURL}${err.response.data}`);

            errorStore.setError(err.response.data.msg, true);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async resetPassword(user: User, token: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .put('auth/reset-password', { user, token })
        .then((res) => {
          if (res.data) {
            this.toast.showToast('Info', res.data.msg, 'blue', '');
            this.router.push({ name: 'login' });
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            if (err.response.data && err.response.status === 301)
              return (document.location.href = `${this.axios.defaults.baseURL}${err.response.data}`);

            errorStore.setError(err.response.data.msg);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
