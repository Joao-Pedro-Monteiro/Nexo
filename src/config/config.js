/**
 * @fileoverview Módulo de configuração da aplicação.
 * @description Carrega e exporta as configurações do aplicativo a partir de um arquivo JSON.
 * 
 * @constant {configPath} String - Caminho para o arquivo de configuração.json
 * @constant {dataFile} String - Conteúdo bruto do arquivo de configuração.
 * @constant {config} Object - Objeto de configuração parseado a partir do JSON.
 */

const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'config.json');

const dataFile = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(dataFile);

console.log("config.js -> (OBJ)config:", config);

module.exports = config; // Exporta o objeto de configuração