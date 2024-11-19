import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import 'alertifyjs/build/css/alertify.css';`
      }
    }
  },
  plugins: [react()],
  define: {
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  build: {
    chunkSizeWarningLimit: 500, // Adjust to suit your needs
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0];
            return packageName || 'vendor';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
        },
      },
    },
  },
  server: {
    port: process.env.VITE_PORT || 3000, // Fallback to default port
  },
});
