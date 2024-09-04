var database = require("../database/config");

function listarEmpresa() {
  var instrucaoSql = `SELECT * FROM empresa`;

  return database.executar(instrucaoSql);
}

module.exports = {listarEmpresa};