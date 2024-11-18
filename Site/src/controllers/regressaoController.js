const regressaoModel = require('../models/regressaoModel');

function getMetricasSemanal(req, res) {
    regressaoModel.getSemanalMetrics()
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
            }
            res.json(result);
        })
        .catch(error => {
            console.error("Erro ao buscar métricas semanais:", error);
            res.status(500).json({ error: 'Erro ao buscar métricas semanais.' });
        });
}

module.exports = { getMetricasSemanal };
