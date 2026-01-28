import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'tags-split',
      target: './src/api/generated/api.ts',
      schemas: './src/api/generated/model',
      clean: true,
      client: 'react-query',
      override: {
        mutator: {
          name: 'axiosInstance',
          path: './src/api/axiosInstance.ts',
        },
      },
    },
    input: {
      //   target: process.env.VITE_API_BASE_URL
      //     ? `${process.env.VITE_API_BASE_URL}swagger/v1/swagger.json`
      //     : 'swagger/v1/swagger.json',

      target: 'http://localhost:5181/swagger/v1/swagger.json',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
