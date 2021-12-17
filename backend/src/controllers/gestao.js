const TelegramBot = require('node-telegram-bot-api');
const time  = require('../configs/dataHora');
const log   = require('../configs/log');
const API   = require('../configs/resposta_API');;
const BD    = require('../configs/acessar_BD');
const delay = require('../configs/delay');
const chat_id = process.env.CHAT_ID;
const bot = new TelegramBot(process.env.TOKEN, {polling: true});
let tudo_ok = true;
let resp = {};

class gestao{

  async login(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT *, DATE_FORMAT(hora, '%d/%m/%Y %H:%i') as hora1 FROM login WHERE usuario="${req.body.usuario}" AND senha="${req.body.senha}" AND ativo="s";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async listar_usuarios(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT id, nome_completo FROM login WHERE ativo='s';`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async telegram(req, res){
    const msg = req.body.msg;
    tudo_ok = true;
    resp = {};
    resp.msg = msg;
    await bot.sendMessage(chat_id, msg).then((ok)=>{
      //console.log(ok);
      tudo_ok = true;
    }).catch((erro)=>{
      console.log(erro);
      tudo_ok = false;
    });
    
    API(resp, res, 200, tudo_ok);
  }

  async programa_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT *, DATE_FORMAT(hora, '%d/%m/%Y %H:%i') as hora1 FROM programa`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async programa_insert(req, res){
    const nome = req.body.nome.replace(/'|"/g, "");
    const obs = req.body.obs.replace(/'|"/g, "");
    tudo_ok = true;
    resp = {};
    let query = "";
    if(req.body.mes === '-01'){
      query = `INSERT INTO programa (nome, obs) values ("${nome}", "${obs}");`;
    }else{
      query = `INSERT INTO programa (nome, mes_ano, obs) values ("${nome}", "${req.body.mes}", "${obs}");`;
    }

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async programa_update(req, res){
    const nome = req.body.nome.replace(/'|"/g, "");
    const obs = req.body.obs.replace(/'|"/g, "");
    tudo_ok = true;
    resp = {};
    const query = `UPDATE programa SET nome='${nome}', obs='${obs}' WHERE id='${req.body.id}';`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async programa_delete(req, res){
    tudo_ok = true;
    resp = {};
    const query = `DELETE FROM programa WHERE id="${req.body.id}";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async projetos_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT projetos.*, DATE_FORMAT(previsao_inicio, '%d/%m/%Y') as inicio, DATE_FORMAT(previsao_fim, '%d/%m/%Y') as fim, programa.nome AS prog FROM projetos INNER JOIN programa ON projetos.programa = programa.id ORDER BY id;`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async listar_projetos(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT * FROM projetos ORDER BY id;`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async pegar_projeto(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT * FROM projetos WHERE id='${req.body.id}';`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async pegar_projetos_por_programa(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT * FROM projetos WHERE programa='${req.body.id}';`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async projetos_update(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs.replace(/'|"/g, "");
    const query = `UPDATE projetos SET nome="${req.body.nome}", programa="${req.body.programa}", 
    responsaveis="${req.body.resp}", objetivo="${req.body.objetivo}", previsao_inicio="${req.body.inicio}", 
    previsao_fim="${req.body.fim}", obs="${obs}", concluido="${req.body.concluido}" WHERE id="${req.body.id}";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async projetos_insert(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs.replace(/'|"/g, "");
    const query = `INSERT INTO projetos (nome, programa, responsaveis, objetivo, previsao_inicio, previsao_fim, obs, concluido, aprovado) values ('${req.body.nome}', '${req.body.programa}', '${req.body.resp}', '${req.body.objetivo}', '${req.body.inicio}', '${req.body.fim}', '${obs}', '${req.body.concluido}', 'nao');`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async categorias_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT * FROM categorias;`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async pagamentos_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT * FROM formas_pagamento;`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async itens_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT *, CONCAT('R$', FORMAT(preco_uni, 2)) as uni, CONCAT('R$', FORMAT(preco_uni * qtd, 2)) as total FROM itens ORDER BY id_projeto;`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async itens_insert(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs.replace(/'|"/g, "");
    
    const query = `INSERT INTO itens
    (id_projeto, nome, qtd, preco_uni, preco_total, forma_pagamento, categoria, obs) values
    ('${req.body.id_projeto}','${req.body.nome}','${req.body.qtd}','${req.body.preco_uni}','${req.body.preco_total}',
    '${req.body.forma_pagamento}','${req.body.categoria}','${obs}');`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async itens_update(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs.replace(/'|"/g, "");
    const query = `UPDATE itens SET id_projeto="${req.body.id_projeto}", nome="${req.body.nome}", qtd="${req.body.qtd}", 
    preco_uni='${req.body.preco_uni}', preco_total="${req.body.preco_total}", forma_pagamento="${req.body.forma_pagamento}", 
    categoria="${req.body.categoria}", obs="${obs}" WHERE id="${req.body.id}";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async itens_soma(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT id_projeto, CONCAT(FORMAT(SUM(preco_total), 2)) AS total FROM itens GROUP BY id_projeto;`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async itens_delete(req, res){
    tudo_ok = true;
    resp = {};
    const query = `DELETE FROM itens WHERE id="${req.body.id}";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async itens_projeto(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT *, CONCAT('R$', FORMAT(preco_uni, 2)) as uni, CONCAT('R$', FORMAT(preco_uni * qtd, 2)) as total FROM itens WHERE id_projeto="${req.body.id}";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async inserir_aprovacao(req, res){
    tudo_ok = true;
    resp = {};
    const obs_1 = req.body.obs_1;
    const query = `INSERT INTO aprovacao
    (id_projeto, projeto, programa, responsavel, valor, hora_solicitacao, obs_1, status) values
    ('${req.body.id_projeto}','${req.body.projeto}','${req.body.programa}','${req.body.responsavel}','${req.body.valor}',NOW(),'${obs_1}','Pendente');`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    const query1 = `UPDATE projetos SET aprovado="pend" WHERE id="${req.body.id_projeto}";`;

    await BD(query1).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async listar_aprovacao(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT *, DATE_FORMAT(hora_solicitacao, '%d/%m/%Y %H:%i') as hora1, DATE_FORMAT(hora_aprovacao, '%d/%m/%Y %H:%i') as hora2 FROM aprovacao ORDER BY status DESC;`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async update_aprovacao(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs_2.replace(/'|"/g, "");

    const query1 = `UPDATE aprovacao SET quem_aprovou='${req.body.quem_aprovou}', obs_2='${obs}', hora_aprovacao=NOW(), status='Aprovado' WHERE id="${req.body.id}";`;
    await BD(query1).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    const query2 = `UPDATE projetos SET aprovado="sim" WHERE id="${req.body.id_projeto}";`;
    await BD(query2).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async gasto_insert(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs.replace(/'|"/g, "");

    const query = `INSERT INTO gastos
    (id_programa, id_projeto, id_item, solicitante, valor, aprovado, hora_solicitacao, obs, data_retirada) values
    ('${req.body.id_programa}', '${req.body.id_projeto}', '${req.body.id_item}', '${req.body.solicitante}',
    '${req.body.valor}', 'nao', NOW(), '${obs}', '${req.body.data_retirada}');`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async gasto_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT gastos.*, 
    DATE_FORMAT(hora_solicitacao, '%d/%m/%Y %H:%i') as hora, 
    DATE_FORMAT(data_retirada, '%d/%m/%Y') as data1, 
    FORMAT(valor, 2, 'pt_BR') as reais, 
    programa.nome AS prog, 
    projetos.nome AS proj, 
    itens.nome AS item 
    FROM gastos 
    INNER JOIN programa ON gastos.id_programa = programa.id 
    INNER JOIN projetos ON gastos.id_projeto = projetos.id 
    INNER JOIN itens ON gastos.id_item = itens.id
    ORDER BY aprovado, hora_solicitacao DESC;
    `;

    await BD(query).then((ok)=>{  
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async gasto_update(req, res){
    tudo_ok = true;
    resp = {};

    const query = `UPDATE gastos SET aprovado='sim' WHERE id="${req.body.id}";`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async gasto_update_valor(req, res){
    tudo_ok = true;
    resp = {};

    const query = `UPDATE gastos SET valor="${req.body.valor}" WHERE id="${req.body.id}";`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async gasto_soma(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT gastos.total_gastos, itens.total_itens FROM 
  (SELECT SUM(valor) AS total_gastos FROM gastos WHERE id_projeto='${req.body.id_projeto}' AND aprovado='sim') as gastos,
  (SELECT SUM(preco_total) AS total_itens FROM itens WHERE id_projeto='${req.body.id_projeto}') as itens;`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async gastos_por_projeto(req, res){
    tudo_ok = true;
    resp = {};

    const query = `
    SELECT gt.*, 
    DATE_FORMAT(gt.hora_solicitacao, '%d/%m/%Y %H:%i') as hora, 
    DATE_FORMAT(gt.data_retirada, '%d/%m/%Y') as data1, 
    FORMAT(gt.valor, 2, 'pt_BR') as reais, 
    pg.nome AS prog, 
    pj.nome AS proj, 
    it.nome AS item 
    FROM gastos gt
    INNER JOIN programa pg ON gt.id_programa = pg.id 
    INNER JOIN projetos pj ON gt.id_projeto = pj.id 
    INNER JOIN itens it ON gt.id_item = it.id
    WHERE gt.id_projeto='${req.body.id}';
    `;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async upload(req, res){
    tudo_ok = true;
    resp = {};
    const obs = req.body.obs_comprovante.replace(/'|"/g, "");
    const query = `INSERT INTO comprovantes
    (id_gasto, id_programa, id_projeto, item, solicitante, arquivo, obs, hora) values
    ('${req.body.compro_id_gasto}','${req.body.compro_id_prog}','${req.body.compro_id_proj}','${req.body.compro_item}',
    '${req.body.compro_solicit}','${req.body.nome}','${obs}',NOW());`;

    await BD(query).then((ok)=>{
      //resp.dados = ok;
      resp.msg = "UPLOAD feito com sucesso! Clique em retornar no seu navegador!"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });   

    API(resp, res, 200, tudo_ok);
  }

  async upload_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT *, DATE_FORMAT(hora, '%d/%m/%Y %H:%i') as hora1 FROM comprovantes WHERE id_gasto='${req.body.id}';`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      tudo_ok = false;
      resp.msg = erro;      
    });   

    API(resp, res, 200, tudo_ok);
  }

}
module.exports = new gestao();