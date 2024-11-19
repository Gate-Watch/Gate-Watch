const { getMetricsSemanal } = require('../models/regressaoModel');

async function getMetricasSemanal(req, res) {
    try {
        const { totem, componente } = req.query;

        if (!totem || !componente) {
            return res.status(400).json({ error: "Totem e componente são obrigatórios." });
        }

        const result = await getMetricsSemanal(totem, componente);

        res.json({ metrics: result });
        
    } catch (error) {
        console.error("Erro ao obter métricas semanais:", error);
        res.status(500).json({ error: "Erro ao buscar métricas semanais." });
    }
}

module.exports = { getMetricasSemanal };
