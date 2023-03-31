import { Axios } from 'axios';
import { useAuthStore } from '../../stores/auth';
import { router } from '../router';

export const registerAuthMiddleware = (axios: Axios) => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();
    const authRoutes = ['login', 'register', 'callback', 'reset', 'forgot-password', 'home'];

    if (!authStore.isLoggedIn) {
      if (authRoutes.includes(to.name as string)) return true;
      else return { name: 'login' };
    }

    if (authRoutes.includes(to.name as string) && to.name !== 'home') return { name: 'home' };
    return true;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401 && !error.response?.data?.status) {
        const authStore = useAuthStore();
        authStore.clearAuthData();
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    }
  );
};
