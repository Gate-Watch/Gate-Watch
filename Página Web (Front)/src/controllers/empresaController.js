var empresaModel = require("../models/empresaModel");

function listarEmpresa(req, res) {
    empresaModel.listarEmpresa().then((resultado) => {
      res.status(200).json(resultado);
    });
  }

module.exports = {
    listarEmpresa,
};