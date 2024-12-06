const db = require('../database/config');

// Consulta para frequência dos processos
async function getProcessFrequency() {
    const query = `
        SELECT nomeProcesso, COUNT(*) AS frequencia
        FROM Processos
        GROUP BY nomeProcesso
        ORDER BY frequencia DESC;
    `;
    return db.executar(query);
}

// Consulta para total de CPU por processo
async function getProcessCpuUsage() {
    const query = `
        SELECT nomeProcesso, SUM(cpu_percent) AS total_cpu
        FROM Processos
        GROUP BY nomeProcesso
        ORDER BY total_cpu DESC;
    `;
    return db.executar(query);
}

// Consulta para obter o total de processos registrados
async function getTotalProcessCount() {
    const query = `
        SELECT count(distinct nomeProcesso) AS totalProcessos
        FROM Processos;
    `;
    return db.executar(query);
}

module.exports = { getProcessFrequency, getProcessCpuUsage, getTotalProcessCount };