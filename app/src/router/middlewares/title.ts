import { nextTick } from 'vue';
import { router } from '../router';

export const registerTitleMiddleware = () => {
  router.beforeEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
      document.title = `${to.meta.title as string} - AxentHost` || 'AxentHost';
    });
  });
};
