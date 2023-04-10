/**
 * SWC で TypeScript + React を エラーなく build するのに必要な Options を返却する。
 *
 * @param {boolean} sourceMaps SourceMap を出力するか。
 * @returns 設定オブジェクト。
 */
module.exports = function createSwcDefaultOption(sourceMaps) {
  return {
    sourceMaps: true,
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
  };
};
