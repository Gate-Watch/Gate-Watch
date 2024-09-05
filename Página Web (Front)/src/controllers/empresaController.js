var empresaModel = require("../models/empresaModel");

function listarEmpresa(req, res) {
    empresaModel.listarEmpresa().then((resultado) => {
        res.status(200).json(resultado);
    }).catch((erro) => {
        res.status(500).json({ error: 'Erro ao buscar empresas' });
    });
}

module.exports = {
    listarEmpresa
    
};