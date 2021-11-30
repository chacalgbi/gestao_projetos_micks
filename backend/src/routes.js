const { Router } = require("express");
const gestao = require('./controllers/gestao');

const routes = new Router();

routes.post('/login', gestao.login);
routes.get('/listar_usuarios', gestao.listar_usuarios);
routes.post('/telegram', gestao.telegram);

routes.get('/programa_read', gestao.programa_read);
routes.post('/programa_insert', gestao.programa_insert);
routes.post('/programa_update', gestao.programa_update);
routes.post('/programa_delete', gestao.programa_delete);

routes.get('/projetos_read', gestao.projetos_read);

module.exports = routes;