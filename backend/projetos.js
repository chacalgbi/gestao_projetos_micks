require('dotenv').config()
const app = require('./src/app');

app.listen(8088, () => {
    console.log("API Gestão de Projetos - Porta 8088");
});