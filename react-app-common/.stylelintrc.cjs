module.exports = {
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-recommended',
    'stylelint-config-css-modules',
    'stylelint-a11y',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
  rules: {
    /*
     * Manual
     */
    // コメント記号とコメント本文の間にスペースを強要する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,
    // @extendは難しいから禁止
    'at-rule-disallowed-list': ['extend'],
    // 複雑すぎる指定をはねたいが難しいのでスルー
    'selector-max-specificity': null,
    // コメントの前には空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    // 不正なCSSはNGだが、exportの中はなんでもあり
    'property-no-unknown': true,

    // `display: inline; width: 100px;` などの無効な組み合わせを注意する。
    'plugin/declaration-block-no-ignored-properties': true,

    /*
     * a11y
     */
    // `outline` の単純な非表示化を禁止する。 border などの代替手段を用意すればOK。
    'a11y/no-outline-none': true,
    // :hover のみなにかを処理することを禁止する。 :focus をセットにすること。
    'a11y/selector-pseudo-class-focus': true,
  },
};
