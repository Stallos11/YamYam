import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: process.env.VITE_ENV === 'production' ? '/Mealaway/' : '/',
});
