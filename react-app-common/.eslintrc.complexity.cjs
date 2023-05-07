/**
 * @file 大まかな複雑性を ESLint で測るための設定。
 */

const sharedConfigs = require('@kaave/shares/.eslintrc.complexity.cjs');

module.exports = {
  ...sharedConfigs,
  // @todo 命名がよくないためうまくいかない。
  // extends: ['@kaave/shares/.eslintrc.complexity.cjs'],
  ignorePatterns: [
    '.eslintrc.*',
    'playwright.config.ts',
    'vite.config.*',
    'dist/**/*',
    'build/**/*',
    '**/*.d.ts',
    '**/*.spec.ts',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};
