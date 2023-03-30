import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginIndex from '../views/auth/Login.vue';
import Home from '../views/Home.vue';
import RecipesIndex from '../views/recipes/List.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)*', redirect: '/' },
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { title: 'Home' },
  },
  {
    path: '/login',
    component: LoginIndex,
    name: 'login',
    meta: { title: 'Login' },
  },
  {
    path: '/register',
    component: () => import('../views/auth/Register.vue'),
    name: 'register',
    meta: { title: 'Register' },
  },
  {
    path: '/reset',
    component: () => import('../views/auth/Reset.vue'),
    name: 'reset',
    meta: { title: 'Reset' },
  },
  {
    path: '/forgot-password',
    component: () => import('../views/auth/ForgotPassword.vue'),
    name: 'forgot-password',
    meta: { title: 'Forgot password' },
  },
  {
    path: '/callback',
    component: () => import('../views/auth/Callback.vue'),
    name: 'callback',
    meta: { title: 'Loading' },
  },
  {
    path: '/feed',
    component: RecipesIndex,
    name: 'feed',
    meta: { title: 'feed' },
  },
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
