const fs = require('fs').promises; // Usando promises para operações assíncronas
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'data', 'contacts.json'); // Caminho para o arquivo JSON
let formValues = {};

window.addEventListener('DOMContentLoaded', () => {

const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        formValues = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            instagram: document.getElementById('instagram').value,
        };
        await main()
            .then((response) => {
                console.log('Contato adicionado com sucesso!');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('Erro ao adicionar o contato:', error);
            })
    });})

// Função que registra o novo contato no arquivo JSON
async function addContactToJson(contactObj) {
    try {
        // Lê o conteúdo atual do arquivo JSON
        const oldData = await fs.readFile(filePath, 'utf8');

        let data;
        try {
            data = JSON.parse(oldData);
        } catch (parseError) {
            // Se houver erro de parse, inicia com array vazio
            data = [];
        }

        // Garante que 'data' seja um array antes de adicionar novos contatos
        if (!Array.isArray(data)) {
            data = [];
        }
        data.push(contactObj);

        // Converte o objeto de volta para JSON e escreve no arquivo
        const newData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, newData, 'utf8');
        console.log('Dados adicionados com sucesso!');

    } catch (error) {
        // Se o arquivo não existir, cria um novo JSON vazio e tenta adicionar o contato novamente
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, '[]', 'utf8');
            return addContactToJson(contactObj); // Chama a função novamente
        } else {
            console.error('Erro ao ler o arquivo JSON:', error);
            throw error; // Propaga o erro para tratamento superior
        }
    }
}

// Função principal
async function main() {
    console.log(formValues);
    addContactToJson(formValues);
    return response = true;
}