const contactManager = {
    // Função para redirecionar para edição de contato
    editContactRedirect: function(cttName) {
        if (cttName && cttName.length > 0) {
            localStorage.setItem('ContactInfo_selectedContactName', cttName);
            redir('./editContact.html');
        } else {
            console.error('editContactRedirect -> HTTP: 400 Bad Request -> "Sintaxe de redirecionamento inválida"');
        }
    },

    // Função para carregar contato para edição
    loadContactForEdit: function() {
        try {
            const name = localStorage.getItem('ContactInfo_selectedContactName');
            const contact = this.contactQuery(name);
            
            if (contact) {
                console.log('Contato encontrado: ' + contact.name);
                this.plotFields(contact);
            } else {
                alert('Contato não encontrado!');
            }
        } catch (error) {
            console.error("editContato.js -> ERROR: " + error);
            alert('Erro ao carregar contato: ' + error);
        }
    },

    // Função para buscar contato no arquivo JSON
    contactQuery: function(name) {
        try {
            // Lê o arquivo de contatos
            const contactsData = fs.readFileSync(contactListPath, 'utf8');
            const contacts = JSON.parse(contactsData);
            
            // Encontra o contato pelo nome
            return contacts.find(contact => contact.name === name);
        } catch (error) {
            console.error('Erro ao ler arquivo de contatos:', error);
            return null;
        }
    },

    // Função para plotar campos com dados do contato
    plotFields: function(contact) {
        if (contact) {
            document.getElementById('editContactInput-name').value = contact.name;
            document.getElementById('editContactInput-phone').value = contact.phone;
            document.getElementById('editContactInput-email').value = contact.email;
            document.getElementById('editContactInput-instagram').value = contact.instagram;
        }
    },

    // Função para limpar campos
    clearFields: function() {
        const inputs = [
            'editContactInput-name', 
            'editContactInput-phone', 
            'editContactInput-email', 
            'editContactInput-instagram'
        ];
        
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = '';
        });
    },

    // Função para editar contato
    editContact: function() {
        try {
            // Recupera os dados dos inputs
            const newName = document.getElementById('editContactInput-name').value;
            const newPhone = document.getElementById('editContactInput-phone').value;
            const newEmail = document.getElementById('editContactInput-email').value;
            const newInstagram = document.getElementById('editContactInput-instagram').value;

            // Recupera a lista de contatos
            const contactsData = fs.readFileSync(contactListPath, 'utf8');
            let contacts = JSON.parse(contactsData);

            // Recupera o nome original do contato que está sendo editado
            const originalName = localStorage.getItem('ContactInfo_selectedContactName');

            // Encontra o índice do contato original
            const indice = contacts.findIndex(contato => contato.name === originalName);

            // Se encontrou o contato
            if (indice !== -1) {
                // Atualiza os dados do objeto
                contacts[indice] = {
                    name: newName,
                    phone: newPhone,
                    email: newEmail,
                    instagram: newInstagram
                };

                // Salva de volta no arquivo JSON
                fs.writeFileSync(contactListPath, JSON.stringify(contacts, null, 2), 'utf8');

                // Log de sucesso
                console.log(`Contato ${originalName} atualizado com sucesso para ${newName}!`);

                // Redireciona de volta para a lista de contatos
                redir('./index.html');
            } else {
                console.error(`Contato ${originalName} não encontrado para edição.`);
                alert('Erro ao atualizar contato. Contato não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao editar contato:', error);
            alert('Erro ao salvar contato. Verifique os dados e tente novamente.');
        }
    }
};

// Evento para carregar contato ao carregar a página de edição
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se está na página de edição de contato
    if (document.getElementById('editContactInput-name')) {
        contactManager.loadContactForEdit();
    }
});

// Expõe funções globalmente para uso em onclick
function editContactRedirect(name) {
    contactManager.editContactRedirect(name);
}

function editContact() {
    contactManager.editContact();
}

function plotFields() {
    const contact = contactManager.contactQuery(
        localStorage.getItem('ContactInfo_selectedContactName')
    );
    contactManager.plotFields(contact);
}

module.exports = { contactManager };