const dashModel = require('../models/dashModel');

const media = {
    obterMedias: async (req, res) => {
        console.log("Requisição recebida:", req.params.periodo); // Adicione isso para verificar o que está sendo recebido
        const { periodo } = req.params;
        let media;

        try {
            if (periodo === 'hoje') {
                media = await dashModel.obterMediasDiarias();
            } else if (periodo === 'semanal') {
                media = await dashModel.obterMediasSemanais();
            } else if (periodo === 'mensal') {
                media = await dashModel.obterMediasMensais();
            }

            res.json(media);
        } catch (error) {
            console.error("Erro ao obter médias:", error);
            res.status(500).json({ error: "Erro ao obter médias" });
        }
    }
};

module.exports = media;
