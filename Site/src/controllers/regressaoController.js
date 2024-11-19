const { getMetricsSemanal } = require('../models/regressaoModel');

async function getMetricasSemanal(req, res) {
    try {
        const { totem, componente } = req.query;

        if (!totem || !componente) {
            return res.status(400).json({ error: "Totem e componente são obrigatórios." });
        }

        const result = await getMetricsSemanal(totem, componente);

        if (!Array.isArray(result)) {
            console.error("O resultado não é um array:", result);
            return res.status(500).json({ error: "Erro ao processar os dados do servidor." });
        }

        const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const returnedDays = result.map(item => item.dia_semana);
        const missingDays = allDays.filter(day => !returnedDays.includes(day));

        res.json({
            metrics: result,
            missingDays
        });
    } catch (error) {
        console.error("Erro ao obter métricas semanais:", error);
        res.status(500).json({ error: "Erro ao buscar métricas semanais." });
    }
}


module.exports = { getMetricasSemanal };
