const db = require('../database/config');

function getMetricsByTotemAndComponent(totem, componente) {
    const componentColumn = getComponentColumn(componente);

    if (!componentColumn) {
        console.error('Componente inválido:', componente);
        return Promise.reject(new Error('Componente inválido.'));
    }

    console.log(`Executando consulta SQL para totem=${totem}, coluna=${componentColumn}`);
    
    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia_semana,
            ROUND(AVG(${componentColumn}), 2) AS componente_avg
        FROM Desempenho
        WHERE WEEK(dtHora) = WEEK(CURDATE())
        AND YEAR(dtHora) = YEAR(CURDATE())
        AND fkTotem = ${totem}
        GROUP BY dia_semana
        ORDER BY FIELD(dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;

    console.log('Query gerada:', query);

    return db.executar(query, [totem]).catch(error => {
        console.error('Erro na execução da query:', error);
        throw error;
    });
}


function getComponentColumn(componente) {
    switch (componente.toLowerCase()) {
        case 'cpu':
            return 'cpu_usage';
        case 'ram':
            return 'memory_perc';
        case 'disco':
            return 'disk_perc';
        default:
            return null;
    }
}

module.exports = { 
    getMetricsByTotemAndComponent 
};
