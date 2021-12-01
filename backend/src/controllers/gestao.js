const TelegramBot = require('node-telegram-bot-api');
const time  = require('../configs/dataHora');
const log   = require('../configs/log');
const API   = require('../configs/resposta_API');;
const BD    = require('../configs/acessar_BD');
const delay = require('../configs/delay');
const chat_id = -1001779760701;
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
      log(erro, "erro");
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
      log(erro, "erro");
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
      log(erro, "erro");
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
    const query = `INSERT INTO programa (nome, obs) values ("${nome}", "${obs}");`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      log(erro, "erro");
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
      log(erro, "erro");
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
      log(erro, "erro");
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async projetos_read(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT projetos.*, DATE_FORMAT(previsao_inicio, '%d/%m/%Y') as inicio, DATE_FORMAT(previsao_fim, '%d/%m/%Y') as fim, programa.nome AS prog FROM projetos INNER JOIN programa ON projetos.programa = programa.id;`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      log(erro, "erro");
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async projetos_update(req, res){
    tudo_ok = true;
    resp = {};
    const query = `UPDATE projetos SET nome="${req.body.nome}", programa="${req.body.programa}", 
    responsaveis="${req.body.resp}", objetivo="${req.body.objetivo}", previsao_inicio="${req.body.inicio}", 
    previsao_fim="${req.body.fim}", obs="${req.body.obs}", concluido="${req.body.concluido}" WHERE id="${req.body.id}";`;

    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      log(erro, "erro");
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

  async projetos_insert(req, res){
    tudo_ok = true;
    resp = {};
    const query = `INSERT INTO projetos (nome, programa, responsaveis, objetivo, previsao_inicio, previsao_fim, obs, concluido, aprovado) values ('${req.body.nome}', '${req.body.programa}', '${req.body.resp}', '${req.body.objetivo}', '${req.body.inicio}', '${req.body.fim}', '${req.body.obs}', '${req.body.concluido}', 'nao');`;
    await BD(query).then((ok)=>{
      resp.dados = ok;
      resp.msg = "Sucesso"; 
    }).catch((erro)=>{
      log(erro, "erro");
      tudo_ok = false;
      resp.msg = erro;      
    });

    API(resp, res, 200, tudo_ok);
  }

}
module.exports = new gestao();