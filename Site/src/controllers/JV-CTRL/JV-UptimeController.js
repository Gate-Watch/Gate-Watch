const disponibilidadeModel = require("../../models/JV-Model/JV-UptimeModel");

async function obterDisponibilidadeSemanal(req, res) {
    const { ano, mes } = req.params; 
    try {
        const resultado = await disponibilidadeModel.obterDisponibilidadeSemanal(ano, mes);
        
        if (resultado.length > 0) {
            res.json(resultado); 
        } else {
            res.status(404).send("Nenhum dado de disponibilidade encontrado.");
        }
    } catch (erro) {
        console.error("Erro ao obter disponibilidade semanal:", erro);
        res.status(500).json({ erro: erro.sqlMessage || "Erro interno do servidor" });
    }
}

async function obterAnosDisponiveis(req, res) {
    try {
        const anos = await disponibilidadeModel.obterAnosDisponiveis();
        res.json(anos);
    } catch (erro) {
        console.error("Erro ao obter anos disponíveis:", erro);
        res.status(500).json({ erro: erro.sqlMessage || "Erro interno do servidor" });
    }
}

async function obterMesesDisponiveis(req, res) {
    const { ano } = req.params;
    try {
        const meses = await disponibilidadeModel.obterMesesDisponiveis(ano);
        res.json(meses);
    } catch (erro) {
        console.error("Erro ao obter meses disponíveis:", erro);
        res.status(500).json({ erro: erro.sqlMessage || "Erro interno do servidor" });
    }
}

async function obterAnoMesMaisRecente(req, res) {
    try {
        const resultado = await disponibilidadeModel.obterAnoMesMaisRecente();
        res.json(resultado);
    } catch (erro) {
        console.error("Erro ao obter ano e mês mais recente:", erro);
        res.status(500).json({ erro: erro.sqlMessage || "Erro interno do servidor" });
    }
}

module.exports = {
    obterDisponibilidadeSemanal,
    obterAnosDisponiveis,
    obterMesesDisponiveis,
    obterAnoMesMaisRecente
};
