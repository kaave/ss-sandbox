const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

const createSwcDefaultOption = require('./scripts/createSwcDefaultOption.cjs');

const isDevelopmentMode = process.env.NODE_ENV !== 'production';

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'kaave',
    projectName: 'react-app-common',
    webpackConfigEnv,
    argv,
  });

  // Note: TS 関連が混じっていると面倒を生むので排除する
  defaultConfig.module.rules = defaultConfig.module.rules.filter(({ test }) => !test.test('.ts'))

  // Note: React は独自に読みこんでほしいので排除する
  defaultConfig.externals = defaultConfig.externals.filter(external => !/^react(-dom)?$/.test(external));

  // Note: PostCSS に対応させたいので追加する
        // {
        //   test: /\.css$/i,
        //   include: [/node_modules/, /src/],
        //   exclude: [/\.module\.css$/],
        //   use: [
        //     {
        //       loader: require.resolve("style-loader", { paths: [__dirname] }),
        //     },
        //     {
        //       loader: require.resolve("css-loader", { paths: [__dirname] }),
        //       options: {
        //         modules: false,
        //       },
        //     },
        //   ],
        // },
        // {
        //   test: /\.module\.css$/i,
        //   exclude: [/node_modules/],
        //   use: [
        //     {
        //       loader: require.resolve("style-loader", { paths: [__dirname] }),
        //     },
        //     {
        //       loader: require.resolve("css-loader", { paths: [__dirname] }),
        //       options: {
        //         modules: true,
        //       },
        //     },
        //   ],
        // },

  return merge(defaultConfig, {
    externalsType: 'system',
    externals: {
      // 'single-spa': 'singleSpa'
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: createSwcDefaultOption(isDevelopmentMode),
          },
        },
      ],
    }
  });
};
