const db = require('../database/config');

function getSemanalMetrics() {
    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia_semana,
            ROUND(AVG(cpu_usage), 2) AS cpu_usage_avg,
            ROUND(AVG(memory_perc), 2) AS memory_perc_avg,
            ROUND(AVG(disk_perc), 2) AS disk_perc_avg
        FROM Desempenho
        WHERE WEEK(dtHora) = WEEK(CURDATE())
        AND YEAR(dtHora) = YEAR(CURDATE())
        GROUP BY DAYNAME(dtHora)
        ORDER BY FIELD(DAYNAME(dtHora), 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;
    return db.executar(query);
}

module.exports = {
    getSemanalMetrics
};
