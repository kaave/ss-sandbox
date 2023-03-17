const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "kaave",
    projectName: "react-app-1",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // this project self deps packages.
    externals: {},
  });
};
