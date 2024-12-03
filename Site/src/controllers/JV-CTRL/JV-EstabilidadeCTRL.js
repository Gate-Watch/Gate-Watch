const estabilidadeModel = require("../../models/JV-Model/JV-EstabilidadeModel");

async function calcularMedia(req, res) {
    try {
        const resultado = await estabilidadeModel.calcularEstabilidade();
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ message: "Nenhum dado encontrado para o mês atual." });
        }
    } catch (error) {
        console.error("Erro ao calcular estabilidade média:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

module.exports = { calcularMedia };
