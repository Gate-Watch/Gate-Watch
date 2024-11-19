const db = require('../database/config');

async function getMetricsSemanal(totem, componente) {
    const componentMap = {
        CPU: 'cpu_usage',
        RAM: 'memory_perc',
        DISCO: 'disk_perc'
    };

    const selectedColumn = componentMap[componente];
    if (!selectedColumn) {
        throw new Error("Componente inválido.");
    }

    const query = `
    SELECT 
        DAYNAME(dtHora) AS dia_semana,
        ROUND(AVG(${selectedColumn}), 2) AS valor
    FROM Desempenho
    WHERE WEEK(dtHora) = WEEK(CURDATE())
      AND YEAR(dtHora) = YEAR(CURDATE())
      AND fkTotem = ${totem}
    GROUP BY dia_semana
    ORDER BY FIELD(
        dia_semana, 
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    );
`;

    try {
        const [rows] = await db.executar(query, [totem]); 
        return rows; 
    } catch (error) {
        console.error("Erro ao executar consulta no banco de dados:", error);
        throw error;
    }
}

module.exports = { getMetricsSemanal };
