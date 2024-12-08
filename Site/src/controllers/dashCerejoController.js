const model = require('../models/dashCerejoModel');

// Obtém a frequência dos processos
async function getProcessFrequency(req, res) {
    var totem = req.body.totemServer
    try {
        const data = await model.getProcessFrequency(totem);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao obter frequência de processos:", error);
        res.status(500).json({ error: "Erro ao buscar frequência de processos." });
    }
}

// Obtém o total de CPU utilizado pelos processos
async function getProcessCpuUsage(req, res) {
    var totem = req.body.totemServer
    try {
        const data = await model.getProcessCpuUsage(totem);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao obter uso de CPU:", error);
        res.status(500).json({ error: "Erro ao buscar uso de CPU." });
    }
}

// Obtém o total de processos registrados
async function getTotalProcessCount(req, res) {
    try {
        const data = await model.getTotalProcessCount();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao obter o total de processos:", error);
        res.status(500).json({ error: "Erro ao buscar o total de processos." });
    }
}

module.exports = { getProcessFrequency, getProcessCpuUsage, getTotalProcessCount };