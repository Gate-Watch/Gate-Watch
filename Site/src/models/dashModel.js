const db = require('../database/config');

function getDiariaMetrics() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_usage)) AS memory_usage,
            ROUND(AVG(disk_usage)) AS disk_usage
        FROM Desempenho
        WHERE DATE(dtHora) = CURDATE()
    `;
    
    return db.executar(query); 
}

function getSemanalMetrics() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_usage)) AS memory_usage,
            ROUND(AVG(disk_usage)) AS disk_usage
        FROM Desempenho
        WHERE WEEK(dtHora) = WEEK(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE())
    `;
    return db.executar(query);
}

function getMensalMetrics() {
    const query = `
        SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_usage)) AS memory_usage,
            ROUND(AVG(disk_usage)) AS disk_usage
        FROM Desempenho
        WHERE MONTH(dtHora) = MONTH(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE())
    `;
    return db.executar(query);
}

function getTotemMetrics(codigoSerie) {
  const query = `
      SELECT 
          ROUND(AVG(cpu_usage)) AS cpu_usage,
          ROUND(AVG(memory_usage)) AS memory_usage,
          ROUND(AVG(disk_usage)) AS disk_usage
      FROM Desempenho
      WHERE fkTotem = ${codigoSerie}
      AND DATE(dtHora) = CURDATE()
  `;

  return db.executar(query);
}


module.exports = {
    getDiariaMetrics,
    getSemanalMetrics,
    getMensalMetrics,
    getTotemMetrics
};
