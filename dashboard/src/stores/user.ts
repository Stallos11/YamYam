import { defineStore } from "pinia";
import { nextTick } from "vue";
import { ClickRowArgument } from "vue3-easy-data-table";
import { IUser } from "../models/user";

interface Recipe {
  name: string;
  id: string;
  img: string;
}

interface ISelectedUser {
  user: any;
  recipes: Recipe[] | null;
  favourites: any[];
}

interface State {
  isLoading: boolean;
  users: IUser[];
  selectedUser: ISelectedUser;
  isModalOpened: boolean;
  isModalDeleteOpened: boolean;
  isModalEditOpened: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    isLoading: true,
    users: [],
    isModalOpened: false,
    isModalDeleteOpened: false,
    isModalEditOpened: false,
    selectedUser: {
      user: {},
      recipes: [],
      favourites: [],
    },
  }),

  actions: {
    copyUserKey(key: string) {
      navigator.clipboard.writeText(this.selectedUser.user[key]);
    },

    fetchData() {
      this.isLoading = true;
      this.axios
        .get("users")
        .then((res) => {
          this.users = res.data;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },

    fetchDataDetails(id: string) {
      this.axios
        .get(`users/details/${id}`)
        .then((res) => {
          this.selectedUser.user = res.data.user;
          this.selectedUser.recipes = res.data.user_recipes;
        })
        .catch(console.error);
    },

    showDetails(item: ClickRowArgument) {
      this.selectedUser.user = item;
      this.fetchDataDetails(item.id);
      this.isModalOpened = true;
    },

    delete() {
      this.axios
        .delete(`users/${this.selectedUser.user.id}`)
        .then((res) => {
          if (res.status == 200) {
            this.users = this.users.filter(
              (user) => user.id != this.selectedUser.user.id
            );
            this.isModalOpened = false;
            this.isModalDeleteOpened = false;
            this.toast.showToast("Info", "user deleted", "bg-dark", "bg-dark");
          }
        })
        .catch((err) => console.error(err));
    },
    cancelDelete() {
      this.isModalDeleteOpened = !this.isModalDeleteOpened;
    },
    showDeleteModal() {
      this.isModalDeleteOpened = true;
    },
    redirEdit() {
      this.isModalOpened = false;
      this.router.replace("/users/edit");
    },
    update() {
      this.axios
        .put(`users/${this.selectedUser.user.id}`, {
          firstname: this.selectedUser.user.firstname,
          email: this.selectedUser.user.email,
        })
        .then((res) => {
          this.toast.showToast("Info", "user updated", "bg-dark", "bg-dark");
          this.router.replace("/users");
        })
        .catch((err) => console.error(err));
    },
  },
});
