import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**/dist/*',
      '**/build/*',
      '**/storybook-static/*',
      '**/node_modules/*',
      '**/!.storybook/*',
    ],
  },
  {
    files: ['*.ts', '*.tsx'],
  },
  prettierConfig,
];
