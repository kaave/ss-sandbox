const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const orgName = 'kaave';
const projectName = 'react-app-common';

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
  });

  const isDevelopmentMode = argv.mode !== 'production';

  // TS 関連が混じっていると面倒を生むので排除する
  defaultConfig.module.rules = defaultConfig.module.rules.filter(({ test }) => !test.test('.ts'));

  // React は独自に読みこんでほしいので排除する
  defaultConfig.externals = defaultConfig.externals.filter(external => !/^react(-dom)?$/.test(external));

  // PostCSS に対応させ、あわせて Production の際に CSS を単体ファイルとして Export する。
  defaultConfig.module.rules
    .filter(({ test }) => test.test('.css') || test.test('.module.css'))
    .forEach(prev => {
      const [maybeStyleLoader, ...rest] = prev.use;
      prev.use = [
        // style-loader と mini-css-extract-plugin は排他関係
        ...(isDevelopmentMode ? [maybeStyleLoader] : [MiniCssExtractPlugin.loader]),
        ...rest,
        'postcss-loader',
      ];
    });

  const outputPath = projectName;
  return merge(defaultConfig, {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: `${outputPath}/index.js`,
      // filename: `index.js`,
      // publicPath: `${outputPath}/`,
      publicPath: `auto`,
    },
    externalsType: 'system',
    externals: {
      // 'single-spa': 'singleSpa'
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            ...(!isDevelopmentMode ? ['babel-loader'] : []),
            {
              loader: 'swc-loader',
              options: {
                sourceMaps: isDevelopmentMode,
                jsc: {
                  parser: {
                    syntax: 'typescript',
                    tsx: true,
                  },
                  transform: {
                    react: {
                      // for "ReferenceError: React is not defined" error
                      runtime: 'automatic',
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
    devServer: {
      static: {
        directory: 'public',
      },
    },
    ...(!isDevelopmentMode && {
      plugins: [
        new MiniCssExtractPlugin({ filename: `${outputPath}/index.css` }),
        new CopyWebpackPlugin({ patterns: ['public'] }),
      ],
      devtool: false,
    }),
  });
};
