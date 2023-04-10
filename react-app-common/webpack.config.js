const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

const isDevelopmentMode = process.env.NODE_ENV !== 'production';

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "kaave",
    projectName: "react-app-common",
    webpackConfigEnv,
    argv,
  });

  // Note: TS 関連が混じっていると面倒を生むので排除する
  defaultConfig.module.rules = defaultConfig.module.rules.filter(({ test }) => !test.test('.ts'))

  return merge(defaultConfig, {
    // this project self deps packages.
    externals: {},
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
    }
  });
};
