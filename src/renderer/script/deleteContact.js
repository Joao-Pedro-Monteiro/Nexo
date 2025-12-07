const path = require('path');
const contactListPath = path.join('../../data/contacts.json');

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