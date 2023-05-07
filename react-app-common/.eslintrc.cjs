const sharedConfigs = require('@kaave/shares/.eslintrc.cjs');

module.exports = {
  ...sharedConfigs,
  // @todo 命名がよくないためうまくいかない。
  // extends: ['@kaave/shares/.eslintrc.cjs'],
  ignorePatterns: [
    '.eslintrc.*',
    'dist/**/*',
    'doc/**/*',
    'gen/**/*',
    // 自動生成されるものが大半のため。
    '**/*.d.ts',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};
