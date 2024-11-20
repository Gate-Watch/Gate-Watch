const model = require('../models/regressaoModel');

function getMetricasPorTotemEComponente(req, res) {
    const { totem, componente } = req.params;

    console.log(`Recebendo requisição para totem=${totem}, componente=${componente}`);

    if (!totem || !componente) {
        return res.status(400).json({ error: 'Totem e componente são obrigatórios.' });
    }

    model.getMetricsByTotemAndComponent(totem, componente)
        .then(result => {
            console.log('Resultado do banco de dados:', result);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Nenhuma métrica encontrada para o totem e componente especificados.' });
            }
            res.json(result);
        })
        .catch(error => {
            console.error('Erro ao buscar métricas:', error);
            res.status(500).json({ error: 'Erro ao buscar métricas para o totem e componente.' });
        });
}


module.exports = { 
    getMetricasPorTotemEComponente 
};
