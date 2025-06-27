const configArchivePath = path.join(__dirname, '..', '..', 'config', 'config.js');
config = require(configArchivePath);

console.log("configImport -> config:", config);
