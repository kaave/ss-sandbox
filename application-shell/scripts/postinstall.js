const fs = require('fs');
const path = require('path');

/**
 * 指定の path を削除する。 `rm -rf` とほぼ同様。
 *
 * @param {string} dirPath - 削除対象。
 */
function rmDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  fs.readdirSync(dirPath).forEach(item => {
    const deleteTarget = path.join(dirPath, item)

    if (fs.lstatSync(deleteTarget).isDirectory()) {
      rmDir(deleteTarget)
    } else {
      fs.unlinkSync(deleteTarget)
    }
  });

  fs.rmdirSync(dirPath);
}

/**
 * 指定のファイルを `node_modules` から `public` へコピーする。
 *
 * @param {readonly string[]} copyFiles - コピー対象のファイル一覧。
 */
function copyNodeModules(copyFiles) {
  copyFiles.forEach(filePath => {
    const srcPath = path.join(__dirname, '..', 'node_modules', filePath);
    const distPath = path.join(__dirname, '..', 'public', filePath);

    fs.mkdirSync(path.dirname(distPath), { recursive: true });
    fs.copyFileSync(srcPath, distPath);

    console.info(`Copy: [${srcPath}] to [${distPath}]`, srcPath, distPath);
  });
}

function main() {
  copyNodeModules([
    // single-spa, SystemJS の実行ファイルは bundle せずに個別に読み込む必要がある模様なので public へコピーする。
    '/single-spa/lib/system/single-spa.min.js',
    '/single-spa/lib/system/single-spa.min.js.map',
    '/import-map-overrides/dist/import-map-overrides.js',
    '/import-map-overrides/dist/import-map-overrides.js.map',
    '/systemjs/dist/system.min.js',
    '/systemjs/dist/system.min.js.map',
    '/systemjs/dist/extras/amd.min.js',
    '/systemjs/dist/extras/amd.min.js.map',
    '/systemjs-babel/dist/systemjs-babel.js',
  ]);
}

main();
