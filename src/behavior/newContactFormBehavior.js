window.addEventListener('DOMContentLoaded', () => {
    const submitbtn = document.getElementById('submitBtn');
    nameField = document.getElementById('name');
    phoneField = document.getElementById('phone');
    nameField.focus();
    nameOK = false;
    phoneOK = false;
    
    // Desabilita o botão de submit e formata-o
    submitbtn.setAttribute('disabled', true);
    submitbtn.style.backgroundColor = 'gray';
    submitbtn.style.cursor = 'not-allowed';

    // Verifica o valor do campo nome
    nameField.addEventListener('input', () => {
        if(nameField.value.length > 0){
            nameOK = true;
        }
        if(nameOK && phoneOK){
            submitbtn.removeAttribute('disabled');
            submitbtn.style.backgroundColor = '#8403DA';
            submitbtn.style.cursor = 'pointer';
        }
    })
    // Verifica o valor do campo telefone
    phoneField.addEventListener('input', () => {
        if(phoneField.value.length > 11){
            phoneOK = true;
        }
        if(nameOK && phoneOK){
            submitbtn.removeAttribute('disabled');
            submitbtn.style.backgroundColor = '#8403DA';
            submitbtn.style.cursor = 'pointer';
        }
    })
    
    
})