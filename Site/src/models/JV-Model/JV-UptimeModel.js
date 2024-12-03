const database = require("../../database/config");

async function obterDisponibilidadeSemanal(ano, mes) {
    const query = `
      SELECT 
    t.codigo_serie AS totem,
    ROUND(COUNT(DISTINCT CASE 
        WHEN YEAR(d.dtHora) = ${ano} AND MONTH(d.dtHora) = ${mes} AND WEEK(d.dtHora, 1) = WEEK(DATE_SUB(CONCAT(${ano}, '-', ${mes}, '-01'), INTERVAL DAYOFMONTH(CONCAT(${ano}, '-', ${mes}, '-01')) - 1 DAY), 1) THEN DATE_FORMAT(d.dtHora, '%Y-%m-%d %H:%i') 
        END) / 10080 * 100, 2) AS disponibilidade_semana_1,
    ROUND(COUNT(DISTINCT CASE 
        WHEN YEAR(d.dtHora) = ${ano} AND MONTH(d.dtHora) = ${mes} AND WEEK(d.dtHora, 1) = WEEK(DATE_SUB(CONCAT(${ano}, '-', ${mes}, '-01'), INTERVAL DAYOFMONTH(CONCAT(${ano}, '-', ${mes}, '-01')) - 1 DAY), 1) + 1 THEN DATE_FORMAT(d.dtHora, '%Y-%m-%d %H:%i') 
        END) / 10080 * 100, 2) AS disponibilidade_semana_2,
    ROUND(COUNT(DISTINCT CASE 
        WHEN YEAR(d.dtHora) = ${ano} AND MONTH(d.dtHora) = ${mes} AND WEEK(d.dtHora, 1) = WEEK(DATE_SUB(CONCAT(${ano}, '-', ${mes}, '-01'), INTERVAL DAYOFMONTH(CONCAT(${ano}, '-', ${mes}, '-01')) - 1 DAY), 1) + 2 THEN DATE_FORMAT(d.dtHora, '%Y-%m-%d %H:%i') 
        END) / 10080 * 100, 2) AS disponibilidade_semana_3,
    ROUND(COUNT(DISTINCT CASE 
        WHEN YEAR(d.dtHora) = ${ano} AND MONTH(d.dtHora) = ${mes} AND WEEK(d.dtHora, 1) = WEEK(DATE_SUB(CONCAT(${ano}, '-', ${mes}, '-01'), INTERVAL DAYOFMONTH(CONCAT(${ano}, '-', ${mes}, '-01')) - 1 DAY), 1) + 3 THEN DATE_FORMAT(d.dtHora, '%Y-%m-%d %H:%i') 
        END) / 10080 * 100, 2) AS disponibilidade_semana_4
FROM 
    Totem t
LEFT JOIN 
    Desempenho d ON t.idTotem = d.fkTotem
WHERE 
    YEAR(d.dtHora) = ${ano} AND MONTH(d.dtHora) = ${mes}
GROUP BY 
    t.codigo_serie;

    `;
    
    try {
        const resultados = await database.executar(query);
        return resultados;
    } catch (erro) {
        console.error("Erro ao obter disponibilidade semanal:", erro);
        throw erro;
    }
}

async function obterAnosDisponiveis() {
    const query = `
        SELECT DISTINCT YEAR(dtHora) AS ano
        FROM Desempenho
        ORDER BY ano DESC;
    `;
    try {
        const resultados = await database.executar(query);
        return resultados;
    } catch (erro) {
        console.error("Erro ao obter anos disponíveis:", erro);
        throw erro;
    }
}

async function obterMesesDisponiveis(ano) {
    const query = `
        SELECT DISTINCT MONTH(dtHora) AS mes
        FROM Desempenho
        WHERE YEAR(dtHora) = ${ano}
        ORDER BY mes;
    `;
    try {
        const resultados = await database.executar(query);
        return resultados;
    } catch (erro) {
        console.error("Erro ao obter meses disponíveis:", erro);
        throw erro;
    }
}

async function obterAnoMesMaisRecente() {
    const query = `
        SELECT YEAR(MAX(dtHora)) AS ano, MONTH(MAX(dtHora)) AS mes
        FROM Desempenho;
    `;
    try {
        const resultados = await database.executar(query);
        return resultados[0]; 
    } catch (erro) {
        console.error("Erro ao obter ano e mês mais recente:", erro);
        throw erro;
    }
}

module.exports = {
    obterDisponibilidadeSemanal,
    obterAnosDisponiveis,
    obterMesesDisponiveis,
    obterAnoMesMaisRecente
};
