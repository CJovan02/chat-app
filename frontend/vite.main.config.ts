import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/main.ts'),
        formats: ['cjs'], // 👈 REQUIRED
        fileName: () => 'main.cjs', // 👈 REQUIRED
      },
      outDir: '.vite/build', // 👈 REQUIRED
      emptyOutDir: false,
      rollupOptions: {
        external: ['electron'],
      },
    },
  };
});
