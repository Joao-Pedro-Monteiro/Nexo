const { exec } = require('child_process');

function openWhatsAppWithNumber(phoneNumber) {
    exec(`start whatsapp://send?phone=${phoneNumber}`, (err) => {
        if (err) {
            console.error('Erro ao abrir o WhatsApp:', err);
        }
    });
}

function openWithBrowser(url) {
    exec(`start "" "${url}"`, (err) => {
        if (err) {
            console.error('Erro ao abrir o WhatsApp:', err);
        }
    });
}
/* O "" após start é um truque para evitar problemas com certos comandos no Windows.
Ele cria uma string vazia como nome da janela antes de abrir a URL. */
