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

function listar_usuarios(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}listar_usuarios`).then(function (response) {
            //console.log(response.data);
            resolve(response.data.dados.resposta);
        })
        .catch(function (error) {
            console.log(error);
            reject(error);
        });
    });
}

async function listar_perfis(){
    let perfis = '';
    const colaboradores = await listar_usuarios();
    colaboradores.map((item)=>{
        perfis += `<div class="form-check"><input class="form-check-input" type="checkbox" 
                    value="${item.id}" id="check${item.id}">${item.nome_completo}</div>`;
    });
    document.getElementById('checks').innerHTML = perfis;
}