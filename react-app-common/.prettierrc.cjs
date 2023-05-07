const sharedConfigs = require('@kaave/shares/.prettierrc.cjs');

module.exports = {
  // Note: 本来は個別にパッケージを切ってきちんと設定すべき。
  // see: https://prettier.io/docs/en/configuration.html#sharing-configurations
  ...sharedConfigs
};
