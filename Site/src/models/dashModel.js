const db = require('../config/database'); // ajuste para sua configuração do banco

const media = {

    obterMediasDiarias: async () => {
        const query = `
      SELECT 
        AVG(cpu_usage) AS media_cpu_usage,
        AVG(memory_usage) AS media_memory_usage,
        AVG(disk_usage) AS media_disk_usage
      FROM Desempenho
      WHERE DATE(dtHora) = CURDATE()`;
        const [results] = await db.query(query);
        return results[0];
    },

    obterMediasSemanais: async () => {
        const query = `
      SELECT 
        AVG(cpu_usage) AS media_cpu_usage,
        AVG(memory_usage) AS media_memory_usage,
        AVG(disk_usage) AS media_disk_usage
      FROM Desempenho
      WHERE YEARWEEK(dtHora, 1) = YEARWEEK(CURDATE(), 1)`;
        const [results] = await db.query(query);
        return results[0];
    },

    obterMediasMensais: async () => {
        const query = `
      SELECT 
        AVG(cpu_usage) AS media_cpu_usage,
        AVG(memory_usage) AS media_memory_usage,
        AVG(disk_usage) AS media_disk_usage
      FROM Desempenho
      WHERE MONTH(dtHora) = MONTH(CURDATE()) AND YEAR(dtHora) = YEAR(CURDATE())`;
        const [results] = await db.query(query);
        return results[0];
    }
};

module.exports = media;
