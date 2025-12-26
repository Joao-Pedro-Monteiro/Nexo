const path = require('path');
const fs = require('fs');
const contactListPath = path.join(__dirname, '../contacts.json');

/**
 * @fileoverview Módulo para consulta de contatos.
 * @description Fornece uma função para buscar contatos em um arquivo .json, BASEADO NO NOME DO CONTATO NO JSON.
 * 
 * @function contactQuery - Função que realiza a consulta no arquivo.
 * @requires fs - Módulo do Node.js para manipulação de sistema de arquivos.
 * @requires path - Módulo do Node.js para manipulação de caminho de arquivos.
 * @param {string} queryParam - Nome do contato a ser buscado.
 * @constant {contactListPath} String - Caminho para o arquivo contacts.json.
 * @returns {Object} - Objeto do contato encontrado ou redireciona para criação de novo contato.
 */

function contactQuery(queryParam) {
    try{
        console.log("contactQuery -> queryParam:", queryParam);

        // Lê o JSON da lista de contatos
        const contactList = JSON.parse(fs.readFileSync(contactListPath, 'utf8'));

        // Procura o índice do contato com o nome correspondente
        let contact = contactList.findIndex(contact => contact.name === queryParam);

        // Verifica se o contato foi encontrado
        if( contact !== -1){
            contact = contactList[contact];
        } else {
            alert("Contato não encontrado.");
            window.location.assign('index.html');
        };

        return contact; //* Retorna o "objeto" do contato encontrado
    }
    catch (error) {
        console.error("contactQuery -> ERROR:", error);
    }

}