const model = require('../models/regressaoModel');

async function obterMediaSemanal(req, res) {
    const { totem, semana, componente } = req.query;

    try {
        if (!totem || !semana || !componente) {
            return res.status(400).json({ error: "Parâmetros 'totem', 'semana' e 'componente' são obrigatórios." });
        }

        const { dias, medias } = await model.calcularMediaSemanal(totem, semana, componente);
        res.status(200).json({ dias, medias });
    } catch (error) {
        console.error("Erro no controller:", error);
        res.status(500).json({ error: "Erro ao calcular a média semanal." });
    }
}

module.exports = { obterMediaSemanal };
