const model = require('../models/regressaoModel');

async function getMetricasPorTotemEComponente(req, res) {
    const { totem, componente } = req.params;

    try {
        // Buscar dados para a semana atual e semana passada
        const semanaAtual = await model.getMetricsForCurrentWeek(totem, componente);
        const semanaPassada = await model.getMetricsForLastWeek(totem, componente);

        res.json({ semanaAtual, semanaPassada });
    } catch (error) {
        console.error('Erro ao buscar métricas:', error.message);
        res.status(500).json({ error: 'Erro ao buscar métricas.', details: error.message });
    }
}

async function getRankingTotens(req, res) {
    try {
        const ranking = await model.getTopMetrics();
        res.json(ranking);
    } catch (error) {
        console.error('Erro ao buscar ranking:', error.message);
        res.status(500).json({ error: 'Erro ao buscar ranking.', details: error.message });
    }
}

module.exports = {
    getMetricasPorTotemEComponente,
    getRankingTotens,
};

