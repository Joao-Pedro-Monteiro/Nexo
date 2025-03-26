try {
    
    const configArchivePath = path.join(__dirname, '..', '..', 'config', 'config.js');
    config = require(configArchivePath);
    console.log("configImport -> IMPORTAÇÃO DE CONFIGURAÇÕES CONCLUÍDA ->", config);

} catch (error) {
    console.error("configImport -> ERRO AO IMPORTAR CONFIGURAÇÕES ->", error);
}