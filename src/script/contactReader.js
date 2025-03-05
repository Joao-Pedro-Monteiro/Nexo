// Função para gerar o HTML
function generateContactList(contacts) {
    let html = '';
    contacts.forEach((contact, index) => {
        const contactId = `contact${index + 1}`; // Gera um ID único para cada contato
        html += `
            <div class="contactList_item">
                <input type="checkbox" class="contactList_itemToggle" id="${contactId}">
                
                <label for="${contactId}" class="contactList_itemInfo">
                    <img class="contactList_avatar" src="./images/SVG/avatar.svg">
                    <div class="contactList_info">
                        <p class="contactList_name">${contact.name}</p>
                        <p class="contactList_phone">${contact.phone}</p>
                    </div>
                </label>

                <div class="contactList_actions">
                    <button name="contactList_actionInfo" class="contactList_actionBtn" title="info">
                        <img src="./images/SVG/info.svg">
                    </button>
                    <button name="contactList_actionSms" class="contactList_actionBtn" title="Sms">
                        <img src="./images/SVG/sms.svg">
                    </button>
                    <button name="contactList_actionWhatsapp" class="contactList_actionBtn" title="Whatsapp">
                        <img src="./images/SVG/whatsapp.svg">
                    </button>
                    <button name="contactList_actionInstagram" class="contactList_actionBtn" title="Instagram">
                        <img src="./images/SVG/instagram2.svg">
                    </button>
                </div>
                <span class="separator"></span>
            </div>
        `;
    });
    return html;
}

// Carregar os contatos via fetch
window.addEventListener('DOMContentLoaded', async () => {
    const contactListContainer = document.getElementById('contactListContainer');
    if (contactListContainer) {
        try {
            const response = await fetch('./contacts.json'); // Caminho relativo ao HTML
            if (!response.ok) throw new Error('Erro ao carregar os contatos');
            
            const data = await response.json();
            contactListContainer.innerHTML = generateContactList(data.contacts);
        } catch (error) {
            console.error('Erro ao buscar os contatos:', error);
        }
    }
});
