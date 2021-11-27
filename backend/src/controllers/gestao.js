const time  = require('../configs/dataHora');
const log   = require('../configs/log');
const API   = require('../configs/resposta_API');;
const BD    = require('../configs/acessar_BD');
const delay = require('../configs/delay');
let tudo_ok = true;
let resp = {};

class gestao{

  async login(req, res){
    tudo_ok = true;
    resp = {};
    const query = `SELECT * FROM login WHERE usuario="${req.body.usuario}" AND senha="${req.body.senha}";`;
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