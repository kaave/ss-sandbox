const isProductionMode = process.argv.includes('--mode=production');

const plugins = {
  /*
   * modifiers
   */
  'postcss-calc': {},
  'postcss-flexbugs-fixes': {},
  'postcss-url': {},
  autoprefixer: {},
  ...(isProductionMode && { cssnano: {} }),
};

module.exports = { plugins };
