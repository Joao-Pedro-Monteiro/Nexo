/**
 * @fileoverview Módulo para deletar contatos.
 * @description Fornece uma função para deletar um contato de um arquivo .json com base no número de telefone.
 * 
 * @function deleteContact - Função que lê o arquivo de contatos, deleta o contato correspondente ao número fornecido e atualiza o arquivo.
 * @function explicitDeleteFunction - Função auxiliar que remove o contato do array de contatos.
 * 
 * @requires fs - Módulo do Node.js para manipulação de sistema de arquivos.
 * @requires path - Módulo do Node.js para manipulação de caminhos de arquivos.
 * 
 * @Nota: Sei que este módulo funciona perfeitamente, mas não entendi porque fiz duas funções de exclusão.
 * E não tem como documentar algo que não entendo. mas, como vou refatorar todo o app nas próximas versões,
 * deixarei assim por enquanto.
 */

const path = require('path');
const contactListPath = path.join(__dirname, '../contacts.json');

// FUNÇÃO PARA DELETAR O ITEM DA ARRAY
function explicitDeleteFunction(contacts, phone) {
    const fs = require('fs');
    // Verifica se dados é um array
    if (Array.isArray(contacts)) {
      // Encontra o índice do objeto com o número correspondente
      const indice = contacts.findIndex(contato => contato.phone === phone);
      
      // Se encontrou o contato (-1 significa não encontrado)
      if (indice !== -1) {
        // Remove o objeto do array
        contacts.splice(indice, 1);
        console.log(`Contato com o número ${phone} removido com sucesso!`);
      } else {
        console.log(`Contato com o número ${phone} não encontrado.`);
      }
    } else {
      console.log("Os dados não estão em formato de array.");
    }
    
    return contacts;
}
  
// FUNÇÃO QUE LÊ O CONTATO, DELETA O CONTATO E ATUALIZA O ARQUIVO
function deleteContact(number) {
    const fs = require('fs');
    fs.readFile(contactListPath, 'utf8', (err, data) => {
      if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return;
      }
      
      let contatos = JSON.parse(data);
      
      contatos = explicitDeleteFunction(contatos, number);
      
      fs.writeFile(contactListPath, JSON.stringify(contatos, null, 2), 'utf8', (err) => {
        if (err) {
          console.error("Erro ao salvar o arquivo:", err);
          return;
        }
        console.log("Arquivo salvo com sucesso!");
        window.location.reload();
      });
    });
}