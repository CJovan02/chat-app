import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/preload.ts'),
      formats: ['cjs'],
      fileName: () => 'preload.cjs',
    },
    outDir: '.vite/build',
    emptyOutDir: false,
    rollupOptions: {
      external: ['electron'],
    },
  },
});
