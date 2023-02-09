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
    meta: { title: "User edit" },
  },
  {
    path: "/recipe-types/",
    component: () => import("../views/recipe_types/List.vue"),
    name: "recipe-types",
    meta: { title: "Recipe type" },
  },
  {
    path: "/recipe-types/edit",
    component: () => import("../views/recipe_types/RecipeTypeEdit.vue"),
    name: "recipe-types-edit",
    meta: { title: "Recipe type edit" },
  },
  {
    path: "/recipe-types/create",
    component: () => import("../views/recipe_types/RecipeTypeCreate.vue"),
    name: "recipe-types-create",
    meta: { title: "Recipe type create" },
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
