const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'config.json');

const dataFile = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(dataFile);

console.log("config.js -> (OBJ)config:", config);

module.exports = config; // Exporta o objeto de configuração