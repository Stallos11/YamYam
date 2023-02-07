import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginIndex from "../views/auth/Login.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/:pathMatch(.*)*", redirect: "/" },
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    name: "home",
    meta: { title: "Home" },
  },
  {
    path: "/login",
    component: LoginIndex,
    name: "login",
    meta: { title: "Login" },
  },
  {
    path: "/users/",
    component: () => import("../views/users/List.vue"),
    name: "users",
    meta: { title: "User" },
  },
  {
    path: "/users/edit",
    component: () => import("../views/users/UserEdit.vue"),
    name: "user-edit",
    meta: { title: "User edit"},
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
