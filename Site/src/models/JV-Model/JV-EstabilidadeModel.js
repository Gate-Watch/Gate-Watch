const database = require("../../database/config");

async function calcularEstabilidade() {
    const instrucaoGeral = `
    SELECT 
    AVG(cpu_usage) AS media_cpu_usage,
    STDDEV(cpu_usage) AS desvio_padrao_cpu_usage,
    AVG(memory_perc) AS media_memory_usage,
    STDDEV(memory_perc) AS desvio_padrao_memory_usage,
    AVG(disk_perc) AS media_disk_usage,
    STDDEV(disk_perc) AS desvio_padrao_disk_usage
FROM 
    Desempenho
WHERE 
    MONTH(dtHora) = MONTH(CURRENT_DATE)
    AND YEAR(dtHora) = YEAR(CURRENT_DATE);


    `;

    try {
        const resultado = await database.executar(instrucaoGeral);
        return resultado;
    } catch (error) {
        console.error("Erro ao calcular estabilidade:", error);
        throw error;
    }
}

module.exports = { calcularEstabilidade };
