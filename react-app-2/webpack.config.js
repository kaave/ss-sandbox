const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "kaave",
    projectName: "react-app-2",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: {},
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              parseMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
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
