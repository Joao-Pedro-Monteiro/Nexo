//* KEYBINDS
document.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'Escape':
            let page = document.location.href.split('/');

            page = page[page.length - 1]; // pega a última parte da URL
            switch (page) {

                case 'index.html': {
                    if(confirm('Deseja sair ?')) {
                        window.close();
                    }
                }
                default: {
                    history.back();
                    break
                }
            }

        case 'f8':
            if (e.altKey) {
                alert('Alt + F8 pressed');
            }
            break;
    }
});