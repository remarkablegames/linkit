import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      parser: tseslint.parser,
    },

    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
]);
