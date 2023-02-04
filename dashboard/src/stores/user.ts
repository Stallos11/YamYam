import { defineStore } from "pinia";
import { ClickRowArgument } from "vue3-easy-data-table";
import { User } from "../models/user";

interface Recipe {
  name: string;
  id: string;
  img: string;
}

interface ISelectedUser {
  user: any;
  recipes: Recipe[] | null;
}

interface State {
  isLoading: boolean;
  balance?: number;
  claimCapability: number;
  claimTimeLeft: number;
  balanceIntervalId?: ReturnType<typeof setInterval> | undefined;
  users: User[];
  selectedUser: ISelectedUser;
  isModalOpened: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    isLoading: true,
    balance: undefined,
    claimCapability: 0,
    claimTimeLeft: 0,
    balanceIntervalId: undefined,
    users: [],
    isModalOpened: false,
    selectedUser: {
      user: {},
      recipes: [],
    },
  }),

  actions: {
    copyUserKey(key: string) {
      navigator.clipboard.writeText(this.selectedUser.user[key]);
    },

    fetchUsers() {
      this.isLoading = true;
      this.axios
        .get("http://127.0.0.1:3333/users/")
        .then((res) => {
          console.log('res', res)
          this.users = res.data;
        })
        .catch(console.error).finally(() => this.isLoading = false);
    },

    fetchUsersDetails(id: string) {
      this.axios
        .get(`http://127.0.0.1:3333/users/details/${id}`)
        .then((res) => {
          console.log(res);
          this.selectedUser.recipes = res.data.user_recipes;
        })
        .catch(console.error);
    },
    showUserDetails(item: ClickRowArgument) {
      this.fetchUsersDetails(item.id);
      this.isModalOpened = !this.isModalOpened;
      this.selectedUser.user = item;
    },
  },
});
