/**
 * @file
 * ESLint の設定。参考にしたのは以下:
 * - https://hepokon365.hatenablog.com/entry/2022/08/17/081732
 */

const OFF = 0;
const WARN = 1;
const ERROR = 2;

/**
 * React 以外の Context (JSDoc) をまとめたもの。
 * 実質厳密に取得することは難しいので、やむなく Arrow function を除外している。
 */
const jsRequire = {
  ClassDeclaration: true,
  ClassExpression: true,
  FunctionDeclaration: true,
  FunctionExpression: true,
  MethodDefinition: true,
};

const tsContexts = [
  'PropertyDefinition',
  'TSInterfaceDeclaration',
  'TSTypeAliasDeclaration',
  'TSPropertySignature',
  'TSMethodSignature',
  'TSEnumDeclaration',
  'TSEnumMember',
];

module.exports = {
  ignorePatterns: [
    '.eslintrc.*',
    'dist/**/*',
    'doc/**/*',
    'gen/**/*',
    // 自動生成されるものが大半のため。
    '**/*.d.ts',
  ],
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['jsdoc'],
  globals: {
    JSX: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
    jsdoc: {
      mode: 'typescript',
    },
  },
  rules: {
    /** Arrow function の return は必要ない場合省略する。 */
    'arrow-body-style': [ERROR, 'as-needed'],
    /** 宣言前の利用を禁止する。巻き上げを考えると後で実装したいことがある。本当にまずいものは tsc が落とすので無効化。 */
    'no-use-before-define': OFF,
    /**
     * switch の default 句を無効化する。個別に処理したほうが変更に強い為無効化。
     * なお代わりに `@typescript-eslint/switch-exhaustiveness-check` で
     * 網羅性を担保しているため、あわせて参照のこと。
     */
    'default-case': OFF,
    /** 条件分岐によって、戻り値を返す/返さないが統一されていることを保証する。TS で担保するため無効化。 */
    'consistent-return': OFF,
    /** `_` を先頭または末尾に付与することを禁止する。特殊な命名を除き有効。 */
    'no-underscore-dangle': [ERROR, { allow: ['__dirname', '__filename'] }],
    /** console API を許可する。 */
    'no-console': OFF,
    /** 関数の代入式を return するのを許可する。Arrow function のみ無効化したいがオプションがないので仕方なく全て許可。 */
    'no-return-assign': OFF,
    /** var を先頭に配置するのを強制しない。 declare と相性が悪く、また JS 空間でももう var は使わない */
    'vars-on-top': OFF,
    /** var を許可する。 declare と相性が悪い。 */
    'no-var': OFF,
    /** 同名の local 変数を許可する。あえて同名にするプラクティスが存在する。 */
    'no-shadow': OFF,

    /** 未使用の変数を禁止する。ESLint では管理せず、 tsc に任せる。 */
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': OFF,

    /** switch ですべての値を網羅していることを強制する。 */
    '@typescript-eslint/switch-exhaustiveness-check': ERROR,
    /** 型情報のみ用いている要素は type-only import を強制する。 */
    '@typescript-eslint/consistent-type-imports': ERROR,
    /**
     * Mutable な引数には readonly (Readonly) を強制する。
     * ルールが制御困難なため無効化するが、基本的に付与する。
     */
    '@typescript-eslint/prefer-readonly-parameter-types': OFF,
    /**
     * async function が await を利用してなくても構わない。
     * Promise を返却するために利用するケースがあるため。
     */
    '@typescript-eslint/require-await': OFF,
    /** await などで処理していない Promise を許可する。あえてそのままにしておきたい場合があるため。 */
    '@typescript-eslint/no-floating-promises': OFF,
    /** 意図していないであろう箇所で利用されている Promise を禁止する。 Iteration 時などに利用する void return のケースは例外。 */
    '@typescript-eslint/no-misused-promises': [ERROR, { checksVoidReturn: false }],
    /** 関数/メソッドの戻り値型を記載することを強制する。 */
    '@typescript-eslint/explicit-function-return-type': [
      ERROR,
      {
        /** 引数はなくても良い */
        allowExpressions: true,
        /** type で定義した関数型を使ってる場合は自明なため端折る */
        allowTypedFunctionExpressions: true,
        /** high order function も型を請求する。 */
        allowHigherOrderFunctions: true,
        /** `as const` を付与した戻り値の場合は省略を許可する。冗長な可能性があるため。 */
        allowDirectConstAssertionInArrowFunctions: true,
        /** 特別許可 */
        // allowNames: ['render'],
      },
    ],

    /** 略語による命名を一部の例外を除き禁止する。 */
    'unicorn/prevent-abbreviations': [
      ERROR,
      {
        replacements: {
          // 以下は許可するもの
          i: { index: false },
          j: { index: false },
          props: { properties: false },
          e: { error: false },
          err: { error: false },
          env: { environment: false },
          dir: { directory: false, direction: false },
          acc: { accumulator: false },
          dist: { distribution: false },
          temp: { temporary: false },
          argv: { argument: false },
          args: { arguments: false, arguments_: false },
          fn: { function_: false, function: false },
          func: { function_: false, function: false },
          prev: { previous: false },
          ref: { reference: false },
          req: { request: false },
          res: { response: false, result: false },
          param: { parameter: false },
          params: { parameters: false },
        },
      },
    ],
    /** `null` を禁止する。 `undefined` と使い分ける必要があるため無効化。*/
    'unicorn/no-null': OFF,
    /** Iteration するメソッドにダイレクトに関数を渡すことを許可する。関数型の文脈ではありふれた実装であるため。 */
    'unicorn/no-array-callback-reference': OFF,
    /** Reduce の使用を許可する。使い所に気をつける必要はあるが、一律禁止はやりすぎである。 */
    'unicorn/no-array-reduce': OFF,
    /**
     * .forEach(...) の使用を許可する。 for .. of より高速。
     * @see {@link https://jsben.ch/aGSc0 Benchmark}
     */
    'unicorn/no-array-for-each': OFF,
    /** ルール指定なしの一括 eslint-disable を許可する。一律禁止は厳しすぎるため。 */
    'unicorn/no-abusive-eslint-disable': OFF,
    /** console.x で半角スペースを利用して出力の調整するのを禁止する。無効化。大きなお世話である。 */
    'unicorn/no-console-spaces': OFF,
    /** camelCase, PascalCase 以外のファイル名は原則禁止する。 */
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],

    /** Prettier で整理するため不要 */
    'import/order': OFF,
    /** default export はコードリーディングの難易度が上がるため禁止する。 */
    'import/prefer-default-export': OFF,
    'import/no-default-export': ERROR,
    /** うまく動かない */
    'import/no-unresolved': OFF,
    /**
     * import 文のファイル名で省略できる拡張子を指定する。
     * JS系は省略を許可する。
     */
    'import/extensions': [
      ERROR,
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        stories: 'always',
      },
    ],

    /** `<button />` に `type` Prop を強要する。意図しない Submit を防ぐため。 */
    'react/button-has-type': ERROR,
    /** Props | State は Object Destructuring して参照する。 */
    'react/destructuring-assignment': [
      ERROR,
      'always',
      {
        /** クラスフィールドは除外 */
        ignoreClassFields: true,
        /** Props は引数の括弧の中で展開する */
        destructureInSignature: 'always',
      },
    ],
    /**
     * `React.displayName` の記載を強制する。
     * HOC (ex. memo) の際にうまく動かないためやむなく無効化。
     */
    'react/display-name': OFF,
    /** `className` `style` など複雑性を著しく増加させる気配のする Prop を禁止する。 */
    'react/forbid-component-props': ERROR,
    /** Component は Arrow function */
    'react/function-component-definition': [ERROR, { namedComponents: 'arrow-function' }],
    /** `useState` の命名を `[foo, setFoo]` というルールで強制する。ただし Object destructuring している場合は除く。 */
    'react/hook-use-state': [ERROR, { allowDestructuredState: true }],
    /** `boolean` の Prop で値を取る必要がない場合はつけない。 */
    'react/jsx-boolean-value': [ERROR, 'never', { always: [] }],
    /** タグを閉じる `>` の位置を固定する。 */
    'react/jsx-closing-bracket-location': [ERROR, 'line-aligned'],
    /** 閉じタグの位置を固定する。 */
    'react/jsx-closing-tag-location': ERROR,
    /** 文字列指定できる Prop や children の書き方を統一する。 */
    'react/jsx-curly-spacing': [ERROR, 'never', { allowMultiline: true }],
    /** JSX 中の `{ }` の中で無駄な改行を挟めないようにする */
    'react/jsx-curly-newline': [
      ERROR,
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    /** `=` の周囲のスペースをなしで固定する。 */
    'react/jsx-equals-spacing': [ERROR, 'never'],
    /** JSX を `.tsx` でも許可する */
    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', '.jsx'] }],
    /** Props の改行を固定する。 */
    'react/jsx-first-prop-new-line': [ERROR, 'multiline-multiprop'],
    /** Fragment は必要のない限り省略記法で統一する。 */
    'react/jsx-fragments': [ERROR, 'syntax'],
    /** JSX のインデントは `2` */
    'react/jsx-indent': [ERROR, 2],
    /** Props が関係するインデントは `2` */
    'react/jsx-indent-props': [ERROR, 2],
    /** `.bind()` は複雑なため禁止する。必要な場合は Arrow function の利用でおおよそまかなえる。 */
    'react/jsx-no-bind': ERROR,
    /** Context に `useMemo` `useCallback` されてない値を渡すのを禁止する。 */
    'react/jsx-no-constructed-context-values': ERROR,
    /** JSX で `&&` を禁止する。予期せぬレンダリングを防止するため。 */
    'react/jsx-no-leaked-render': ERROR,
    /** `a` タグに `javascript:` を渡すことを禁止する。危険。 */
    'react/jsx-no-script-url': ERROR,
    /**
     * 意味の無い Fragment を禁止する。ただし変数展開のために使用するのは許容する。
     * `<>{'\u00A0'}</>` のような特殊文字を許可するため。
     */
    'react/jsx-no-useless-fragment': [ERROR, { allowExpressions: true }],
    /**
     * 一行につき一コンポーネントを強要する。
     * 半角スペースで区切られたパラグラフ + React Componentなどに対応できないため重すぎる。無効化
     */
    // 'react/jsx-one-expression-per-line': [ON, { allow: 'single-child' }],
    /** コンポーネントの命名は PascalCase で統一する。 */
    'react/jsx-pascal-case': ERROR,
    /** JSX 中の連続した改行やスペースを禁止する。基本的にUXに現れないため。 */
    'react/jsx-props-no-multi-spaces': ERROR,
    /**
     * Props を Spread Operator で渡すのを禁止する。
     * 型をすり抜けて不要な値が混じってしまう可能性があるため。
     */
    'react/jsx-props-no-spreading': ERROR,
    /** JSX の細かいスペースを規約で縛る。 */
    'react/jsx-tag-spacing': [
      ERROR,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    /** JSX の細かい改行を規約で縛る。 */
    'react/jsx-wrap-multilines': [
      ERROR,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    /** 初期化前に `setState` するのを禁止する。バグのもとのため。 */
    'react/no-access-state-in-setstate': ERROR,
    /**
     * Iteration する際に `key` へ index を利用することを禁止する。
     * @todo かなり厳しいルールで、Reactのレンダリングについて理解がある場合は不要。
     *   ある程度のコードを書いてから検討する。
     */
    'react/no-array-index-key': ERROR,
    /** Lifecycle methods で Arrow function の利用を禁止する。テストやパフォーマンスに悪影響を及ぼすため。 */
    'react/no-arrow-function-lifecycle': ERROR,
    /** dangerous...を禁止する。気軽に使うものではないので、使う場合は明示的に無効化してコメントを書く。 */
    'react/no-danger': ERROR,
    /** 無効な HTML Attribute を禁止する。 */
    'react/no-invalid-html-attribute': ERROR,
    /**
     * React element の命名に `Ns:foo` のような namespace を利用することを禁止する。
     * 一貫性を保つため無効化。
     */
    'react/no-namespace': ERROR,
    /** Props の Default 値に新規インスタンスを作成する書き方を禁止する。 */
    'react/no-object-type-as-default-prop': ERROR,
    /**
     * PureComponent で shouldComponentUpdate を使うことを禁止する。
     * PureComponent である意義が薄れるため。
     */
    'react/no-redundant-should-component-update': ERROR,
    /** Function component の中で `this` を参照することを禁止する。 */
    'react/no-this-in-sfc': ERROR,
    /** ありがちな typo を禁止する。 */
    'react/no-typos': ERROR,
    /**
     * コンポーネントの中でネストしたコンポーネントの宣言を禁止する。
     * 外部で宣言すべきである。
     */
    'react/no-unstable-nested-components': ERROR,
    /** 未使用の State を禁止する。 */
    'react/no-unused-state': ERROR,
    /** `componentWillUpdate` の中で `setState` を禁止する。無限 Loop を招くため。 */
    'react/no-will-update-set-state': OFF,
    /** Function component で書ける際はそれを強要する。 */
    'react/prefer-stateless-function': [ERROR, { ignorePureComponents: true }],
    /** propType を禁止する。 TS で書いているので利用する必要性がない。 */
    'react/prop-types': OFF,
    /** `/>` で閉じれる際は閉じタグではなくそれを強要する。 */
    'react/self-closing-comp': ERROR,
    /** Class Component のメソッドを指定の順番で並べる。 */
    'react/sort-comp': ERROR,
    /** Class Component の State は constructor で初期化することを強要する。 */
    'react/state-in-constructor': [ERROR, 'always'],
    /** `style` という命名の Props は Object で固定する。それ以外は動作しないため。 */
    'react/style-prop-object': ERROR,
    /** `img` `br` など children をとらないタグが取ることを禁止する。 */
    'react/void-dom-elements-no-children': ERROR,

    /** 型で担保するので不要 */
    'react/require-default-props': OFF,
    'react/no-unused-prop-types': OFF,

    /*
     * JSDoc
     *
     * Note: `"plugin:jsdoc/recommended-typescript-error"` というテンプレート設定が存在するが、
     * 冗長な設定が目立つため、必要なものをピンポイントで指定している。
     *
     * またReact Component に専用の設定を適用したいが `v41.1.1` 現在難しいので省略している。
     * ただし React Component のみを対象として省略するのも難しいため、
     * やむなく Arrow Functions をまるごと除外している。
     *
     * 本来 React Component に対し適用したい設定は以下:
     *
     * - Description 必須。
     * - Props は別途 `type Props` として定義し、それぞれの値にコメントを記載する。
     * - `@params` `@returns` は冗長なため書かない。
     * - その他、利用者に対して明確にしておきたい事象。
     */

    /** public な要素には例外なく JSDoc を要求する。 */
    'jsdoc/require-jsdoc': [
      WARN,
      {
        publicOnly: true,
        require: jsRequire,
        contexts: tsContexts,
      },
    ],

    /** `*` が抜けていてフォーマットが崩れることを禁止する。 */
    'jsdoc/require-asterisk-prefix': WARN,
    /** `*` が冗長に足されていてフォーマットが崩れることを禁止する。 */
    'jsdoc/no-multi-asterisks': [WARN, { allowWhitespace: true }],
    /** 半角スペースや改行なのでフォーマットが崩れることを禁止する。 */
    'jsdoc/check-alignment': WARN,

    /** 利用できるタグに制限を設け、でっちあげのタグを利用できないようにする。 */
    'jsdoc/check-tag-names': WARN,

    /**
     * Description を必須とする。
     * また `@description` は使わず、最初の行をそのまま description として記載する。
     */
    'jsdoc/require-description': [
      WARN,
      {
        descriptionStyle: 'body',
        contexts: [...Object.keys(jsRequire), ...tsContexts],
      },
    ],
    /** Description のあとには空行を要求する。 */
    'jsdoc/tag-lines': [WARN, 'always', { count: 1 }],

    /**
     * 引数に対応した `@param` タグを必須とする。
     * なお、標準設定と異なり Object 形式の引数は展開しない。
     */
    'jsdoc/require-param': [WARN, { checkDestructured: false, contexts: Object.keys(jsRequire) }],
    /** `@param` タグの説明文の前に `-` を挿入することを必須とする。 */
    'jsdoc/require-hyphen-before-param-description': WARN,
    /** `@param` タグには description を必須とする。 */
    'jsdoc/require-param-description': [WARN, { contexts: Object.keys(jsRequire) }],
    /** `@param` タグには name を必須とする。 */
    'jsdoc/require-param-name': WARN,
    /** `@param` タグの name と実装を一致させる。 */
    'jsdoc/check-param-names': [WARN, { checkDestructured: false }],

    /** 戻り値に対応した `@returns` タグを必須とする。 */
    'jsdoc/require-returns': [WARN, { contexts: Object.keys(jsRequire) }],
    /** `@returns` タグと実装の矛盾を認めない。 `void` なのに書かれている、など。 */
    'jsdoc/require-returns-check': WARN,
    /** `@returns` タグには description を必須とする。 */
    'jsdoc/require-returns-description': WARN,

    /** `throw` statement を含む場合は `@throws` タグの記載を必須とする。 */
    'jsdoc/require-throws': WARN,

    /**
     * `{TYPES}` という書式で型情報を付与することを禁止する。
     * TypeScript を前提としているので、必要がないどころか、冗長である。
     */
    'jsdoc/no-types': WARN,

    /** タグの並び順を強制する。 */
    'jsdoc/sort-tags': WARN,
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // トランスパイルしないので require() 許可
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
    /** For unit / integration test files */
    {
      files: ['*.spec.(ts|tsx)'],
      extends: [
        'plugin:vitest/recommended',
        // Note: Vitest でも問題なく使える
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      rules: {
        'import/no-extraneous-dependencies': OFF,
      },
    },
    /** For Storybook files */
    {
      files: ['*.stories.tsx'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        /** Allow default export. Storybook needs this. */
        'import/no-default-export': OFF,
        /** Allow spread operator on Props. It useful in Storybook. */
        'react/jsx-props-no-spreading': OFF,
      },
    },
  ],
};
