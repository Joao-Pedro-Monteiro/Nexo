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
        console.error(`redir() -> HTTP 400: Bad Request -> "Sintaxe de redirecionamento inválida"`);
    }
}

// Funções de redirecionamento (adaptadas para Node.js)
function socialRedirect(url) {
    try {
        console.log(`socialRedirect -> Redirecionando para: ${url}`);
        redir(url);
    } catch (error) {
        console.error(`socialRedirect -> Erro ao redirecionar para ${url}:`, error);
    }
}

function infoRedirect(ctt) {
    if (ctt.length > 9) {
        try{
            localStorage.setItem('ContactInfo_selectedContactPhoneNumber', ctt);
            window.location.assign('./contactInfo.html');
        } catch (error) {
            console.error('infoRedirect -> Erro ao redirecionar para /contactInfo.html:', error);
        }
    } else {
        console.error('infoRedirect -> HTTP: 400 Bad Request -> "Sintaxe de redirecionamento inválida"');
    }
}