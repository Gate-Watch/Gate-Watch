const model = require('../models/dashCerejoModel');

// Obtém a frequência dos processos
async function getProcessFrequency(req, res) {
    try {
        const data = await model.getProcessFrequency();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao obter frequência de processos:", error);
        res.status(500).json({ error: "Erro ao buscar frequência de processos." });
    }
}

// Obtém o total de CPU utilizado pelos processos
async function getProcessCpuUsage(req, res) {
    try {
        const data = await model.getProcessCpuUsage();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro ao obter uso de CPU:", error);
        res.status(500).json({ error: "Erro ao buscar uso de CPU." });
    }
}

module.exports = { getProcessFrequency, getProcessCpuUsage };
