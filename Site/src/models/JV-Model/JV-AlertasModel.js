var database = require("../../database/config");

async function obetertop5() {
    const query = `
            SELECT fkTotem, COUNT(*) AS totalAlertas
            FROM Alerta
            GROUP BY fkTotem
            ORDER BY totalAlertas DESC
            LIMIT 5;
    `;
    try {
        const resultados = await database.executar(query);
        console.log("Resultados brutos da consulta SQL:", resultados);
        return resultados; 
    } catch (erro) {
        console.error("Erro ao executar a consulta SQL:", erro);
        throw erro;
    }
}


module.exports = {
    obetertop5
};
