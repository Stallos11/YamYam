import { FilterOption, Header } from "vue3-easy-data-table";

export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  pseudo?: string;
  email?: string;
  role?: "admin" | "member" | "no-access";
  password?: string;
  token?: string;
}

export const userTableHeaders: Header[] = [
  { text: "Firstname", value: "firstname", sortable: true },
  { text: "Email", value: "email", sortable: true },
  { text: "Provider", value: "provider", sortable: true },
  { text: "Created_at", value: "created_at", sortable: true },
];
export const userFilterKeyOptions = [
  "firstname",
  "email",
  "provider",
  "created_at",
];
