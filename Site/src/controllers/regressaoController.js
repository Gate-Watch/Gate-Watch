const model = require('../models/regressaoModel');

async function getMetricasPorTotemEComponente(req, res) {
   const { totem, componente } = req.params;

   try {
       
       const semanaAtual = await model.getMetricasSemanaAtual(totem, componente);
       const semanaPassada = await model.getMetricaSemanaPassada(totem, componente);

       res.json({ semanaAtual, semanaPassada });
   } catch (error) {
       console.error('Erro ao buscar métricas:', error.message);
       res.status(500).json({ error: 'Erro ao buscar métricas.', details: error.message });
   }
}

async function getRankingTotens(req, res) {
   try {
       const ranking = await model.getMaioresMetricas();
       res.json(ranking);
   } catch (error) {
       console.error('Erro ao buscar ranking:', error.message);
       res.status(500).json({ error: 'Erro ao buscar ranking.', details: error.message });
   }
}

async function getDadosDiarios(req, res) {
   const { totem, componente, dia } = req.params;

   try {
       const dados = await model.getDadosPorDia(totem, componente, dia);
       res.json(dados);
   } catch (error) {
       console.error('Erro ao buscar dados diários:', error.message);
       res.status(500).json({ error: 'Erro ao buscar dados diários.', details: error.message });
   }
}

module.exports = {
   getMetricasPorTotemEComponente,
   getRankingTotens,
   getDadosDiarios
};