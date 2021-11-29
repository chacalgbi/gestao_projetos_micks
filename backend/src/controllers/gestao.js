const TelegramBot = require('node-telegram-bot-api');
const time  = require('../configs/dataHora');
const log   = require('../configs/log');
const API   = require('../configs/resposta_API');;
const BD    = require('../configs/acessar_BD');
const delay = require('../configs/delay');
const TOKEN = '2117878119:AAFrKPaZi63dQudWVJgYkmP4y5_Iym5kd2A';
const chat_id = -1001779760701;
const bot = new TelegramBot(TOKEN, {polling: true});
let tudo_ok = true;
let resp = {};
//https://api.telegram.org/bot2117878119:AAFrKPaZi63dQudWVJgYkmP4y5_Iym5kd2A/getUpdates

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
    tudo_ok = true;
    resp = {};
    const query = `INSERT INTO programa (nome, obs) values ("${req.body.nome}", "${req.body.obs}");`;

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
    tudo_ok = true;
    resp = {};
    const query = `UPDATE programa SET nome='${req.body.nome}', obs='${req.body.obs}' WHERE id='${req.body.id}';`;

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

}
module.exports = new gestao();