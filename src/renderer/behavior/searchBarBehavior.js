document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchBar');
    const searchBarInput = document.getElementById('searchBarInput');

    // Garantir que o input esteja habilitado e focável
    searchBarInput.disabled = false;
    console.log("searchBarBehavior.js -> Barra de pesquisa habilitada.");
    
    searchForm.removeEventListener('submit', handleSubmit);
    console.log("searchBarBehavior.js -> Evento de envio da barra de pesquisa removido.");
    
    searchForm.addEventListener('submit', handleSubmit)
    console.log("searchBarBehavior.js -> Evento de envio da barra de pesquisa adicionado.");

    searchForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        searchValue = searchBarInput.value;
        console.log("searchBarBehavior.js -> searchValue:", searchValue);
        localStorage.setItem('ContactInfo_selectedContactName', searchValue);
        window.location.assign('./contactInfo.html');
    })

    function handleSubmit(event) {
        event.preventDefault();

        const searchValue = searchBarInput.value;
        if (searchValue) {
            console.log("searchBarBehavior.js -> searchValue:", searchValue);
            
        }

        // Verifica se o contato existe antes de redirecionar
        
    }

})  