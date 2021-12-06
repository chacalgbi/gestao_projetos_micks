const { Router } = require("express");
const gestao = require('./controllers/gestao');

const routes = new Router();

routes.post('/login', gestao.login);
routes.get('/listar_usuarios', gestao.listar_usuarios);
routes.post('/telegram', gestao.telegram);
routes.get('/categorias_read', gestao.categorias_read);
routes.get('/pagamentos_read', gestao.pagamentos_read);

routes.get('/programa_read', gestao.programa_read);
routes.post('/programa_insert', gestao.programa_insert);
routes.post('/programa_update', gestao.programa_update);
routes.post('/programa_delete', gestao.programa_delete);

routes.get('/listar_projetos', gestao.listar_projetos);
routes.get('/projetos_read', gestao.projetos_read);
routes.post('/projetos_update', gestao.projetos_update);
routes.post('/projetos_insert', gestao.projetos_insert);
routes.post('/pegar_projeto', gestao.pegar_projeto);

routes.get('/itens_read', gestao.itens_read);
routes.post('/itens_projeto', gestao.itens_projeto);
routes.post('/itens_insert', gestao.itens_insert);
routes.post('/itens_update', gestao.itens_update);
routes.post('/itens_delete', gestao.itens_delete);
routes.get('/itens_soma', gestao.itens_soma);

routes.post('/inserir_aprovacao', gestao.inserir_aprovacao);
routes.get('/listar_aprovacao', gestao.listar_aprovacao);
routes.post('/update_aprovacao', gestao.update_aprovacao);

module.exports = routes;