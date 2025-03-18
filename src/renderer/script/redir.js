function redir(path, timeout) {
    document.getElementById("main").style.opacity = "0";
    if (timeout > 0 && timeout !== undefined) {
        setTimeout(() => {
            window.location.assign(path);
        }, timeout * 1000);
    } else if (timeout === undefined) {
        window.location.assign(path);
    }
    else {
        console.error(`HTTP 400: Bad Request -> "Sintaxe de redirecionamento inválida"`);
    }
}

// Funções de redirecionamento (adaptadas para Node.js)
function socialRedirect(url) {
    console.log(`Redirecionando para: ${url}`);
    window.location.href = url;
}

function infoRedirect(ctt) {
    if (ctt) {
        console.log(`Telefone selecionado: ${ctt}`);
        localStorage.setItem('selectedPhone', ctt);
    } else {
        console.log('Número de telefone não encontrado.');
    }
}