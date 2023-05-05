/**
 * @file
 * for Production mode.
 * Every presets/plugins included in single-spa-react' deps.
 */

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      'babel-plugin-react-css-modules',
      '@babel/plugin-transform-runtime',
      {
        useESModules: true,
        regenerator: false,
      },
    ],
  ]
};
