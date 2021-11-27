const { Router } = require("express");
const gestao = require('./controllers/gestao');

const routes = new Router();

routes.post('/login', gestao.login);


module.exports = routes;