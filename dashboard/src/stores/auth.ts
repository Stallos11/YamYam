import { defineStore } from "pinia";
import { User } from "../models/user";
import { useErrorStore } from "./error";
import { useUserStore } from "./user";

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

export const useAuthStore = defineStore("auth", {
  persist: {
    storage: sessionStorage,
  },
  state: (): State => ({
    isLoading: false,
    user: {
      id: "",
    },
    token: {},
    successMsg: "",
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
    },
    async login(user: User, token: string) {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post("auth/login", {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          if (res.data) {
            this.user = res.data.user;
            this.token = res.data.token.token;

            this.axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.token.token}`;
            this.router.push("/");
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
    async logout() {
      this.isLoading = true;
      const errorStore = useErrorStore();

      return this.axios
        .post("auth/logout")
        .then((res) => {
          if (res.data) {
            this.clearAuthData();
            this.router.push("/login");
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
  },
});
