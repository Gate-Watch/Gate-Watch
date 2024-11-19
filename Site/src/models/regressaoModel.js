const db = require('../database/config');

function getMetricasSemanal() {
    const query = `
        SELECT 
            dia_semana,
            cpu_usage_avg,
            memory_perc_avg,
            disk_perc_avg
        FROM (
            SELECT 
                DAYNAME(dtHora) AS dia_semana,
                ROUND(AVG(cpu_usage), 2) AS cpu_usage_avg,
                ROUND(AVG(memory_perc), 2) AS memory_perc_avg,
                ROUND(AVG(disk_perc), 2) AS disk_perc_avg
            FROM Desempenho
            WHERE WEEK(dtHora) = WEEK(CURDATE())
            AND YEAR(dtHora) = YEAR(CURDATE())
            GROUP BY DAYNAME(dtHora)
        ) AS subquery
        ORDER BY FIELD(dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;
    console.log("Consulta SQL executada:", query); // Log para debug
    return db.executar(query);
}


module.exports = {
    getMetricasSemanal
};
