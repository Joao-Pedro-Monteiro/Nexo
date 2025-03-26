function editContactRedirect(phone) {
  if (phone.length > 9) {
        localStorage.setItem('ContactInfo_selectedContactName', phone);
        redir('./editContact.html');
    } else {
        console.error('editContactRedirect -> HTTP: 400 Bad Request -> "Sintaxe de redirecionamento inválida"');
    }
}

// FUNÇÃO PARA EDITAR O ITEM DA ARRAY
function editContact(contacts, phone, newName, newPhone, newEmail) {
  const path = require('path');
  const contactListPath = path.join(__dirname, '..', '..', 'data', 'contacts.json');
  const fs = require('fs');
    // Verifica se dados é um array
    if (Array.isArray(contacts)) {
      // Encontra o índice do objeto com o número correspondente
      const indice = contacts.findIndex(contato => contato.phone === phone);

      // Se encontrou o contato (-1 significa não encontrado)
      if (indice !== -1) {
        // Atualiza os dados do objeto
        contacts[indice].name = newName;
        contacts[indice].phone = newPhone;
        contacts[indice].email = newEmail;
        console.log(`Contato com o número ${phone} atualizado com sucesso!`);
      } else {
        console.log(`Contato com o número ${phone} não encontrado.`);
      }
    } else {
      console.log("Os dados não estão em formato de array.");
    }

    return contacts;
}


// FUNÇÃO QUE LÊ O CONTATO, EDITA O CONTATO E ATUALIZA O ARQUIVO