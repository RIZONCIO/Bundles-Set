import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: './', 
});