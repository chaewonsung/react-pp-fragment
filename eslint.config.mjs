import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: ['webpack.config.js'],
    languageOptions: { globals: { ...globals.browser, require: 'readonly' } },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.jsx'],
    ...reactPlugin.configs.flat.recommended,
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      'react/prop-types': 'off',
    },
  },
]);
