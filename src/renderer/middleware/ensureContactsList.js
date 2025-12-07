fs = require('fs').promises;

if (!path) {
    const path = require('path');
}

async function check(){
    const contactsPath = path.join('../../data/contacts.json');
    try {
        await fs.access(contactsPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Criando novo arquivo de contatos...');
            try {
                const dir = path.dirname(contactsPath);
                await fs.mkdir(dir, { recursive: true });
                await fs.writeFile(contactsPath, '[]', 'utf8');
            } catch (err) {
                console.error('Erro na criação de novo arquivo de contatos:', err);
            }
        } else {
            console.error('Erro ao acessar arquvio de contatos:', error);
        }
    }
}

check()