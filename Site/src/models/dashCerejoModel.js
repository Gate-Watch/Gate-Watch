const db = require('../database/config');

// Consulta para frequência dos processos
async function getProcessFrequency(totem) {
    const query = `
        SELECT nomeProcesso, COUNT(*) AS frequencia
        FROM Processos
        WHERE fkTotem = ${totem}
        GROUP BY nomeProcesso
        ORDER BY frequencia DESC;
    `;
    return db.executar(query);
}

// Consulta para total de CPU por processo
async function getProcessCpuUsage(totem) {
    const query = `
        SELECT nomeProcesso, SUM(cpu_percent) AS total_cpu
        FROM Processos
        WHERE fkTotem = ${totem}
        GROUP BY nomeProcesso
        ORDER BY total_cpu DESC;
    `;
    return db.executar(query);
}

async function getTotalProcessCount() {
    const query = `
        SELECT COUNT(DISTINCT nomeProcesso) AS totalProcessos
        FROM Processos;
    `;
    return db.executar(query);
}

module.exports = { getProcessFrequency, getProcessCpuUsage, getTotalProcessCount };