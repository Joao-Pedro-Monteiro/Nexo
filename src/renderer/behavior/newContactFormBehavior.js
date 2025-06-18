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
        const phoneLength = phoneField.value.trim().length;
        phoneOK = phoneLength >= 10 && phoneLength <= 14;

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
