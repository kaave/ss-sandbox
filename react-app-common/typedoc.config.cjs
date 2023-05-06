/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  plugin: ['typedoc-plugin-missing-exports'],
  entryPoints: ['./src/bootstrap.tsx'],
  out: 'doc',
  // theme: 'hierarchy',
};
