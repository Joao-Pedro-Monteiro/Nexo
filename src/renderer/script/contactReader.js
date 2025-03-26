window.addEventListener('DOMContentLoaded', async () => {
    const fs = require('fs').promises;
    const path = require('path');

    // Função para gerar o HTML
    function generateContactList(contacts) {
        let html = '';

        // Ordena os contatos pelo nome antes de gerar o HTML
        contacts.sort((a, b) => a.name.localeCompare(b.name));

        contacts.forEach((contact, index) => {
            contact.phone = contact.phone.replace(/[^0-9()]/g, '');
            contact.instagram = contact.instagram.replace(/@/g, '');
            const contactId = `contact${index + 1}`;
            html += `
                <div class="contactList_item">
                    <input type="checkbox" class="contactList_itemToggle" id="${contactId}">
                    
                    <label for="${contactId}" class="contactList_itemInfo">
                        <img class="contactList_avatar" src="../images/SVG/avatar.svg">
                        <div class="contactList_info">
                            <p class="contactList_name">${contact.name}</p>
                            <p class="contactList_phone">${contact.phone}</p>
                        </div>
                    </label>

                    <div class="contactList_actions">
                        <button name="contactList_actionInfo" class="contactList_actionBtn" title="info" onclick="infoRedirect('${contact.name}')">
                            <img src="../images/SVG/info.svg">
                        </button>
                        <button name="contactList_actionEmail" class="contactList_actionBtn" title="Email" onclick="openWithBrowser('https://mail.google.com/mail/?view=cm&to=` + contact.email + `')">
                            <img src="../images/SVG/mail2.svg">
                        </button>
                        <button name="contactList_actionWhatsapp" class="contactList_actionBtn" title="Whatsapp" onclick="openWhatsAppWithNumber('${contact.phone.replace(/[^0-9]/g, '')}')">
                            <img src="../images/SVG/whatsapp.svg">
                        </button>
                        <button name="contactList_actionInstagram" class="contactList_actionBtn" title="Instagram" onclick="openWithBrowser('https://instagram.com/${contact.instagram}')">
                            <img src="../images/SVG/instagram2.svg">
                        </button>

                        <button type="button" class="contactList_editBtn" onclick="editContactRedirect('${contact.name}')" title="Editar"><img src="../images/SVG/edit.svg"></button>
                        <button type="button" class="contactList_deleteBtn" onclick="deleteContact('${contact.name}')" title="Excluir"><img src="../images/SVG/trash.svg"></button>
                    </div>
                    <span class="separator"></span>
                </div>
            `;
        });
        return html;
    }

    // Função principal para l  er contatos
    async function readContacts() {
        const contactListContainer = document.getElementById('contactListContainer');

        try {
            const filePath = path.join(__dirname, '..', '..', 'data', 'contacts.json');
            const data = await fs.readFile(filePath, 'utf8');
            const contacts = JSON.parse(data);
            
            const html = generateContactList(contacts);
            contactListContainer.innerHTML = html;
            
            return html; // Retorna o HTML gerado
        } catch (error) {
            console.error('Erro ao buscar os contatos:', error);
            return '';
        }
    }

    // Chama a função para ler os contatos e exibir o HTML
    readContacts();
})