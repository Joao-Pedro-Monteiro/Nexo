/**
 * @fileoverview Módulo para leitura e exibição de contatos.
 * @description Fornece uma função para ler contatos de um arquivo .json e gerar o HTML correspondente para exibição.
 * Quando o DOM estiver completamente carregado, a função readContacts é chamada para buscar e exibir os contatos.
 * 
 * @function readContacts - Função que lê os contatos do arquivo e gera o HTML.
 * @function generateContactList - Função auxiliar que gera o HTML a partir da lista de contatos.
 * 
 * @requires fs - Módulo do Node.js para manipulação de sistema de arquivos.
 * @requires path - Módulo do Node.js para manipulação de caminhos de arquivos.
 */

window.addEventListener('DOMContentLoaded', async () => {
    const fs = require('fs').promises;
    const path = require('path');

    /**
     * @function generateContactList - Função auxiliar que gera o HTML a partir da lista de contatos.
     * @description Gera o HTML para exibição dos contatos em ordem alfabética a partir de um array de objetos de contatos.
     * 
     * @param {Object[]} contacts - Array de objetos de contatos (um objeto com objetos dentro. Ex.: contacts.contact1.telefone).
     * @returns {string} - HTML gerado a partir da lista de contatos.
     */
    
    function generateContactList(contacts) {
        let html = '';

        // Ordena os contatos pelo nome antes de gerar o HTML
        contacts.sort((a, b) => a.name.localeCompare(b.name));

        contacts.forEach((contact, index) => {
            contact.phone = contact.phone.replace(/[^0-9()\s-]/g, '').trim();
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
                        <button type="button" class="contactList_deleteBtn" onclick="deleteContact('${contact.phone}')" title="Excluir"><img src="../images/SVG/trash.svg"></button>
                    </div>
                    <span class="separator"></span>
                </div>
            `;
        });
        return html;
    }

    /**
     * @function readContacts - Função que lê os contatos do arquivo e gera o HTML.
     * @description Lê os contatos do arquivo contacts.json e gera o HTML para exibição.
     * 
     * @constant {contactListContainer} HTMLElement - Elemento do DOM onde o HTML dos contatos será inserido.
     * @constant {filePath} String - Caminho para arquivo de contatos.
     * @constant {data} String - Conteúdo bruto do arquivo de contatos.
     * @constant {contacts} Object[] - Array de objetos de contatos parseados a partir do JSON.
     * @constant {html} String - HTML gerado a partir da lista de contatos com o uso da função generateContactList().
     * @returns {Promise<string>} - Promessa que resolve para o HTML gerado dos contatos.
     */

    async function readContacts() {
        const contactListContainer = document.getElementById('contactListContainer');

        try {
            const filePath = path.join(__dirname, '../contacts.json');

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