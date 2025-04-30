import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
  },
  build: {
    outDir: 'dist', 
  },
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
});