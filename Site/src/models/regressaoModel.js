const db = require('../database/config');

function getSemanalMetricas() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_perc)) AS memory_perc,
            ROUND(AVG(disk_perc)) AS disk_perc
        FROM Desempenho
        WHERE WEEK(dtHora) = WEEK(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE())
    `;
    return db.executar(query);
}

module.exports = {
    getSemanalMetricas
};
