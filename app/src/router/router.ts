import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)*', redirect: '/' },
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { title: 'Home' },
  },
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
