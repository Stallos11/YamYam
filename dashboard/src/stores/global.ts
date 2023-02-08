import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserStore } from "./user";

interface State {
  info: string;
}

export const useGlobalStore = defineStore("global", {
  state: () => ({
    info: "toto",
  }),
  actions: {
    getStore(key: string) {
      const userStore = useUserStore();
      const stores = {
        users: userStore,
      };

      //@ts-ignore
      return stores[key];
    },
  },
});
