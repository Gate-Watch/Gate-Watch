var database = require("../../database/config");

async function obetertop5() {
    const query = `
       SELECT 
    t.codigo_serie, 
    COUNT(*) AS totalAlertas
FROM 
    Alerta a
JOIN 
    Totem t 
ON 
    a.fkTotem = t.idTotem
WHERE 
    MONTH(a.dtAlerta) = MONTH(CURRENT_DATE()) 
    AND YEAR(a.dtAlerta) = YEAR(CURRENT_DATE())
GROUP BY 
    t.codigo_serie
ORDER BY 
    totalAlertas DESC
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
