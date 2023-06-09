const { merge } = require("webpack-merge");
const path = require('path');
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopmentMode = process.env.NODE_ENV !== 'production';

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "kaave";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  // Note: TS 関連が混じっていると面倒を生むので排除する
  defaultConfig.module.rules = defaultConfig.module.rules.filter(({ test }) => !test.test('.ts'))

  // Note: React は独自に読みこんでほしいので排除する
  defaultConfig.externals = defaultConfig.externals.filter(external => !/^react(-dom)?$/.test(external));

  return merge(defaultConfig, {
    externalsType: 'system',
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              sourceMaps: isDevelopmentMode,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    // for "ReferenceError: React is not defined" error
                    runtime: "automatic",
                  },
                },
              },
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public', to: '' }
        ],
      }),
    ],
    devServer: {
      open: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
  });
};
