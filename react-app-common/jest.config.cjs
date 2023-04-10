const createSwcDefaultOption = require('./scripts/createSwcDefaultOption.cjs');

module.exports = {
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': ['@swc/jest', createSwcDefaultOption(true)],
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    'single-spa-react/parcel': 'single-spa-react/lib/cjs/parcel.cjs',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
