const { merge } = require("webpack-merge");
const path = require('path');
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "kaave";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  // Note: React は独自に読みこんでほしいので排除する
  defaultConfig.externals = defaultConfig.externals.filter(external => !/^react(-dom)?$/.test(external));

  return merge(defaultConfig, {
    externalsType: 'system',
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
