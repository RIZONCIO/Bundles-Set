import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    host: true, // Permite conexões externas
    port: 5173, // Porta padrão do Vite (pode ser alterada, se necessário)
  },
});