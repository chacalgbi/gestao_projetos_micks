function sair(){
    $.notify(`Até logo ${sessionStorage.nome}`, "info");
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(function() {
        location.replace("index.html");
    }, 2000);
}

document.title = `Projetos | ${sessionStorage.nome}`;

function verificar(){
    if(sessionStorage.login != "OK"){
        Swal.fire({
            icon: 'error',
            title: 'Usuário Inválido',
            text: 'Faça login para acessar este conteúdo'
          });
        setTimeout(function() {
            location.replace("index.html");
        }, 2500);
    }
}