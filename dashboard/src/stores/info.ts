import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

interface State {
  info: string;
}

export const useInfoStore = defineStore("info", {
  state: (): State => ({
    info: "",
  }),
  actions: {
    setInfo(info: string, forceToast = false) {
      this.info = info;
      if (!useAuthStore().isLoggedIn && !forceToast) return;

      this.toast.showToast("Info", info, "primary", "bg-dark");
    },
  },
});
