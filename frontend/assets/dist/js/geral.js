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

async function list_users(id_div){
    let select_colaboradores = '';
    const colaboradores = await listar_usuarios();
    colaboradores.map((item)=>{
        select_colaboradores += `<div class="form-check"><input class="form-check-input" type="checkbox" 
                    value="${item.nome_completo}" id="${item.nome_completo}">${item.nome_completo}</div>`;
    });
    document.getElementById(id_div).innerHTML = select_colaboradores;
}

function select_users(id_div){
    let users = "";
    let minhaDiv = document.getElementById(id_div);
    let listaMarcados = minhaDiv.getElementsByTagName("input");
    for (loop = 0; loop < listaMarcados.length; loop++) {
        let item = listaMarcados[loop];
        if (item.type == "checkbox" && item.checked) {
            users = users + `${item.id}, `;
        }
    }
    const str2 = users.slice(0, -2);
    return str2;  
}