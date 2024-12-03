var alertaModel = require("../../models/JV-Model/JV-PercentualAlertasModel");

async function calcularPercentuaisAlertas(req, res) {
    try {
        const resultado = await alertaModel.calcularPercentualAlertas();

        if (resultado.length > 0) {
            const percentuais = resultado.map(item => ({
                componente: item.componente,
                percentual: item.percentual
            }));
            res.json(percentuais); 
        } else {
            res.status(404).send("Nenhum alerta encontrado.");
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json(erro.sqlMessage);
    }
}

module.exports = {
    calcularPercentuaisAlertas
};
