const defaultConfig = require('./default.json');
let localConfig;

try {
  localConfig = require('./local.json'); // eslint-disable-line global-require, import/no-unresolved, max-len
} catch (e) {
  localConfig = {};
}

module.exports = { ...defaultConfig, ...localConfig };
