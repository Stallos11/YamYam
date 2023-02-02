import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  base: './YamYam',
  plugins: [
    vue(),
    VitePWA({
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'logoOG.jpg',
        'browserconfig.xml',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'safari-pinned-tab.svg',
        'mstile-150x150.png',
        'img/*',
        // 'assets/*.ttf',
      ],
      manifest: {
        name: 'YamYam',
        short_name: 'YamYam',
        description: 'YamYam',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        start_url: '/',
        lang: 'en',
        theme_color: '#262a32',
        background_color: '#262a32',
      },
    }),
  ],
});
