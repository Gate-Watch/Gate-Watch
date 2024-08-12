var database = require("../database/config");

function exemplo(id){
    var instrucaoSql = `SELECT * FROM usuario WHERE id=${id}`;

    return database.executar(instrucaoSql);
}

module.exports = {
    exemplo
}