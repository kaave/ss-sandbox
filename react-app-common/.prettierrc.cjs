module.exports = {
  plugins: ['prettier-plugin-jsdoc'],
  /** 1行あたりの最大文字数は 120 とする。 */
  printWidth: 120,
  /** インデント幅は 2 とする。 */
  tabWidth: 2,
  /** タブの代わりに半角スペースを用いる。 */
  useTabs: false,
  /** セミコロンは必須とする。 */
  semi: true,
  /** ダブルではなくシングルクォーテーションを使う。 */
  singleQuote: true,
  /** 末尾のカンマは省略しない。 */
  trailingComma: 'all',
  /** Arrow function の括弧は必要なときだけ */
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.ts', '*.tsx'],
      options: {
        /*
         * Configs for prettier-plugin-jsdoc`
         */
        /** `@params` と `@returns` の間に空行を入れる。 */
        jsdocSeparateReturnsFromParam: true,
        /** 各種タグが切り替わる際に空行を入れる。 `@params` のように、連続する場合は入れない。 */
        jsdocSeparateTagGroups: true,
        /** Example タグのコードブロックを Markdown のように triple backticks で囲む。 */
        jsdocPreferCodeFences: true,
        /** JSDoc の場合の1行あたりの最大文字数を 100 とする。少々はやめのほうが読みやすい。 */
        jsdocPrintWidth: 100,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        /*
         * Configs for prettier-plugin-jsdoc`
         */
        /** TSDoc を有効にする。 */
        tsdoc: true,
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
        tabWidth: 4,
        singleQuote: false,
      },
    },
    {
      files: '*.json',
      options: {
        tabWidth: 4,
        singleQuote: false,
      },
    },
  ],
};
