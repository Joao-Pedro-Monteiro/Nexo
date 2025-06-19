window.addEventListener('DOMContentLoaded', () => {
    const submitbtn = document.getElementById('submitBtn');
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    nameField.focus();

    // Flags de validação
    let nameOK = false;
    let phoneOK = false;
    
    // Desabilita o botão de submit e formata-o
    submitbtn.setAttribute('disabled', true);
    submitbtn.style.backgroundColor = 'gray';
    submitbtn.style.cursor = 'not-allowed';

    // Formata e filtra o campo de telefone
    phoneField.addEventListener('input', function (e) {
        let numero = e.target.value.replace(/\D/g, ''); // remove não numéricos
        numero = numero.substring(0, 11); // limita a 11 dígitos

        let formatado = '';

        if (numero.length > 0) {
            formatado += '(' + numero.substring(0, 2); // DDD inicial
        }
        if (numero.length >= 3) {
            formatado += ') ' + numero.substring(2, 7); // início do número
        }
        if (numero.length >= 8) {
            formatado += '-' + numero.substring(7); // parte final
        }

        e.target.value = formatado;
    });

    // Verifica a tecla Enter
    document.addEventListener('keydown', function(event) {
        // Verifica se a tecla Enter foi pressionada sem modificadores
        if (
            event.key === 'Enter' &&
            !event.altKey && !event.ctrlKey &&
            !event.metaKey && !event.shiftKey
        ) {
            event.preventDefault();
            if (nameOK && phoneOK) {
                submitbtn.click();
            }
        }
    });

    // Validação em tempo real
    function validarCampos() {
        nameOK = nameField.value.trim().length > 0;
        const clearPhone = phoneField.value.replace(/\D/g, '');
        phoneOK = clearPhone.length === 11; // (2 do DDD + 9 do número)

        if (nameOK && phoneOK) {
            submitbtn.removeAttribute('disabled');
            submitbtn.style.backgroundColor = '#8403DA';
            submitbtn.style.cursor = 'pointer';
        } else {
            submitbtn.setAttribute('disabled', true);
            submitbtn.style.backgroundColor = '#ccc';
            submitbtn.style.cursor = 'not-allowed';
        }
    }

    // Escuta mudanças em tempo real
    nameField.addEventListener('input', validarCampos);
    phoneField.addEventListener('input', validarCampos);

    // Verifica ao carregar (caso já tenha algo preenchido)
    validarCampos();
});
