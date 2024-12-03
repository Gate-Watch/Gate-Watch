var database = require("../../database/config");

async function calcularFaixaHorarioMaiorUso() {
    const instrucaoGeral = `
   SELECT 
            DATE_FORMAT(dtHora, '%H:00') AS faixa_hora, 
            AVG(cpu_usage) AS media_cpu_usage,
            AVG(memory_perc) AS media_memory_usage,
            AVG(disk_perc) AS media_disk_usage,
            (AVG(cpu_usage) + AVG(memory_perc) + AVG(disk_perc)) / 3 AS media_combinada
        FROM 
            Desempenho
        WHERE 
            MONTH(dtHora) = MONTH(CURRENT_DATE)  
            AND YEAR(dtHora) = YEAR(CURRENT_DATE)  
        GROUP BY 
            faixa_hora
        ORDER BY 
            media_combinada DESC
        LIMIT 1;
    `;
    
    const resultado = await database.executar(instrucaoGeral);
    console.log("Resultado da consulta SQL:", resultado);
        
    if (resultado && resultado.length > 0) {
        return resultado[0]; 
    } else {
        return []; 
    }
}

module.exports = {
    calcularFaixaHorarioMaiorUso
};
