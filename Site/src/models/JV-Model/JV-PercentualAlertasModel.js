var database = require("../../database/config");

async function calcularPercentualAlertas() {
    const instrucaoGeral = `
        SELECT COUNT(*) AS totalAlertas 
        FROM Alerta
        WHERE MONTH(dtAlerta) = MONTH(CURRENT_DATE()) 
          AND YEAR(dtAlerta) = YEAR(CURRENT_DATE());
    `;
    
    const totalAlertasResult = await database.executar(instrucaoGeral);
    const totalAlertas = totalAlertasResult[0]?.totalAlertas || 0; 

    if (totalAlertas === 0) {
        return []; 
    }

    const percentual = `
        SELECT componente, COUNT(*) AS quantidade, 
               (COUNT(*) * 100.0 / ${totalAlertas}) AS percentual
        FROM Alerta
        WHERE MONTH(dtAlerta) = MONTH(CURRENT_DATE()) 
          AND YEAR(dtAlerta) = YEAR(CURRENT_DATE())
        GROUP BY componente;
    `;
    
    const percentuaisResult = await database.executar(percentual);
    return percentuaisResult;
}

module.exports = {
    calcularPercentualAlertas
};
