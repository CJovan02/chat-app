import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended', 'prettier'],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      'arrow-body-style': ['error', 'always'],
      camelcase: ['error', { properties: 'always' }],
      'capitalized-comments': [
        'error',
        { ignoreConsecutiveComments: false, ignoreInlineComments: true },
      ],
      curly: ['error', 'all'],
      'default-case-last': 'error',
      'default-param-last': 'error',
      eqeqeq: ['error', 'always'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'no-array-constructor': 'error',
      'no-console': 'warn',
      'no-else-return': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-boolean-cast': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-magic-numbers': ['warn', { ignoreArrayIndexes: true }],
    },
  },
  tseslint.configs.recommended,
]);
