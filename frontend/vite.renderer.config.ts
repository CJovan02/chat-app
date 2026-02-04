import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, '../docker');
  const env = loadEnv(mode, envDir);

  return {
    envDir: envDir,
    server: {
      port: env.VITE_FRONTEND_PORT ? Number(env.VITE_FRONTEND_PORT) : 5173,
      // host: true, // <-- required for docker
    },
    plugins: [react(), tailwindcss()],
    build: {
      outDir: '../.vite/renderer',
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/App.tsx'),
      },
    },
  };
});
