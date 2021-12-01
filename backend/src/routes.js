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
routes.post('/projetos_update', gestao.projetos_update);
routes.post('/projetos_insert', gestao.projetos_insert);

routes.get('/categorias_read', gestao.categorias_read);
routes.get('/pagamentos_read', gestao.pagamentos_read);
routes.get('/itens_read', gestao.itens_read);
routes.get('/listar_projetos', gestao.listar_projetos);


module.exports = routes;