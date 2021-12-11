const { Router } = require("express");
const gestao = require('./controllers/gestao');
const multer = require('multer');
const path = require('path');

let nome_arquivo = '';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        nome_arquivo = Date.now() + path.extname(file.originalname);
        req.body.nome = nome_arquivo;
        cb(null, nome_arquivo);
    }
});

const upload = multer({storage});

const routes = new Router();

routes.post('/login', gestao.login);
routes.get('/listar_usuarios', gestao.listar_usuarios);
routes.post('/telegram', gestao.telegram);
routes.get('/categorias_read', gestao.categorias_read);
routes.get('/pagamentos_read', gestao.pagamentos_read);
routes.post('/upload', upload.single("file"), gestao.upload);
routes.post('/upload_read', gestao.upload_read);

routes.get('/programa_read', gestao.programa_read);
routes.post('/programa_insert', gestao.programa_insert);
routes.post('/programa_update', gestao.programa_update);
routes.post('/programa_delete', gestao.programa_delete);

routes.get('/listar_projetos', gestao.listar_projetos);
routes.get('/projetos_read', gestao.projetos_read);
routes.post('/projetos_update', gestao.projetos_update);
routes.post('/projetos_insert', gestao.projetos_insert);
routes.post('/pegar_projeto', gestao.pegar_projeto);
routes.post('/pegar_projetos_por_programa', gestao.pegar_projetos_por_programa);

routes.get('/itens_read', gestao.itens_read);
routes.post('/itens_projeto', gestao.itens_projeto);
routes.post('/itens_insert', gestao.itens_insert);
routes.post('/itens_update', gestao.itens_update);
routes.post('/itens_delete', gestao.itens_delete);
routes.get('/itens_soma', gestao.itens_soma);

routes.post('/inserir_aprovacao', gestao.inserir_aprovacao);
routes.get('/listar_aprovacao', gestao.listar_aprovacao);
routes.post('/update_aprovacao', gestao.update_aprovacao);

routes.post('/gasto_insert', gestao.gasto_insert);
routes.post('/gasto_update', gestao.gasto_update);
routes.post('/gasto_update_valor', gestao.gasto_update_valor);
routes.post('/gasto_soma', gestao.gasto_soma);
routes.get('/gasto_read', gestao.gasto_read);
routes.post('/gastos_por_projeto', gestao.gastos_por_projeto);

module.exports = routes;