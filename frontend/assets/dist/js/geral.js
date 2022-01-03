function sair(){
    $.notify(`Até logo ${sessionStorage.nome}`, "info");
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(function() {
        location.replace("index.html");
    }, 2000);
}

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
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

async function list_users(id_div, novo, id = 'nada'){
    let select_colaboradores = '';
    const colaboradores = await listar_usuarios();
    let projeto;
    if(id != 'nada'){
        projeto = await pegar_projeto(id);
        //console.log(projeto[0]);
    }
    colaboradores.map((item, index)=>{
        if(novo === false){
            for(let x = 0; x < projeto.length; x++){
                const pessoas = projeto[x].responsaveis.split(", ");
                if(pessoas.includes(item.nome_completo)){
                    select_colaboradores += `<div class="form-check"> &nbsp&nbsp <input class="form-check-input" type="checkbox" value="${item.nome_completo}" id="${item.nome_completo}" checked>${item.nome_completo}</div>`;
                    break;
                }else{
                    select_colaboradores += `<div class="form-check"> &nbsp&nbsp <input class="form-check-input" type="checkbox" value="${item.nome_completo}" id="${item.nome_completo}" >${item.nome_completo}</div>`;
                    break;
                }
            }
        }else{
            select_colaboradores += `<div class="form-check"> &nbsp&nbsp <input class="form-check-input" type="checkbox" value="${item.nome_completo}" id="${item.nome_completo}" >${item.nome_completo}</div>`;
        }
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

function listar_categorias(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}categorias_read`).then(function (response) {
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_aprovacao(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}listar_aprovacao`).then(function (response) {
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_pagamentos(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}pagamentos_read`).then(function (response) {
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function itens_soma_por_projeto(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}itens_soma`).then(function (response) {
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                //console.log(response.data.dados.resposta);
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_projetos(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}listar_projetos`).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function pegar_projeto(id){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}pegar_projeto`,{id: id}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function pegar_projetos_por_programa(id){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}pegar_projetos_por_programa`,{id: id}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_itens(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}itens_read`).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_programas(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}programa_read`).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function programa_read_dashboard(user){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}programa_read_dashboard`,{user}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_itens_projeto(id){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}itens_projeto`,{id: id}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function gasto_soma(id){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}gasto_soma`,{id_projeto: id}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function upload_read(id){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}upload_read`,{id: id}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function gastos_por_projeto(id){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.post(`${ip}gastos_por_projeto`,{id: id}).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_gastos(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}gasto_read`).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

function listar_gastos_limit(){
    const ip = sessionStorage.ip;
    return new Promise(function(resolve, reject){
        axios.get(`${ip}gasto_read_limit`).then(function (response) {
            //console.log(response.data);
            if(response.data.erroGeral == "sim"){
                Swal.fire({ icon: 'error', title: 'Oops...', text: `${response.data.msg.resposta}` });
                reject(error);
            }else{
                resolve(response.data.dados.resposta);
            }
        })
        .catch(function (error) {
            $.notify(`${error}`, "error");
            console.log(error);
            reject(error);
        });
    });
}

document.title = `Projetos | ${sessionStorage.nome}`;