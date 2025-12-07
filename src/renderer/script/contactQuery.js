const path = require('path');
const contactListPath = path.join(__dirname, '..', 'contacts.json');
const fs = require('fs');

// FUNÇÃO PARA BUSCAR O ITEM DA ARRAY
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
            if(confirm("Contato não encontrado. Deseja criar um novo contato?")){
                window.location.assign('./newContact.html');
            } else {
            window.location.reload();
            };
        };

        return contact; // Retorna o "objeto" do contato encontrado
    }
    catch (error) {
        console.error("contactQuery -> ERROR:", error);
    }

}