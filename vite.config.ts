import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-vue';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      plugin(),
      tailwindcss(),
    ],
    server: {
        port: 57660,
        open: 'index.html',
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@images': resolve('src/assets/images'),
        '@cp': resolve('src/components'),
        '@views': resolve('src/views'),
      }
    }
})
