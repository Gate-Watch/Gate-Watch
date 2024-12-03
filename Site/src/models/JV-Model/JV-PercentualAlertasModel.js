var database = require("../../database/config");

async function calcularPercentualAlertas() {
    const instrucaoGeral = `select count(*) as totalAlertas from Alerta`;
    
    const totalAlertasResult = await database.executar(instrucaoGeral);
    const totalAlertas = totalAlertasResult[0]?.totalAlertas || 0; 

    if (totalAlertas === 0) {
        return []; 
    }

    const percentual = `
        select componente, count(*) as quantidade, 
            (count(*) * 100.0 / ${totalAlertas}) as percentual
        from Alerta
        group by componente
    `;
    
    const percentuaisResult = await database.executar(percentual);
    return percentuaisResult;
}

module.exports = {
    calcularPercentualAlertas
};
