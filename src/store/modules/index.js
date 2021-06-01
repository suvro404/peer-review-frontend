/**
 * Automatically imports all the modules and exports as a single module object
 */
const requireModule = require.context('.', false,  /\.js$/);
const modules = {};

requireModule.keys().forEach(filename => {
  if (filename === './index.js') return;
  const moduleName = filename
    .replace(/(\.\/|\.store\.js)/g, '')

  modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;
