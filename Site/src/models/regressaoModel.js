const db = require('../database/config');

// Mapeia os componentes do frontend para as colunas do banco de dados
function mapComponentToColumn(component) {
    const mapping = {
        Cpu: 'cpu_usage',
        Ram: 'memory_perc',
        Disco: 'disk_perc',
    };
    return mapping[component] || null;
}

function    getMetricsForCurrentWeek(totem, component) {
    const column = mapComponentToColumn(component);
    if (!column) {
        throw new Error(`Componente inválido: ${component}`);
    }

    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia_semana,
            ROUND(AVG(${column}), 2) AS componente_avg
        FROM Desempenho
        WHERE fkTotem = ${totem}
        AND WEEK(dtHora) = WEEK(CURDATE())
        AND YEAR(dtHora) = YEAR(CURDATE())
        GROUP BY dia_semana
        ORDER BY FIELD(dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;
    return db.executar(query);
}


function getMetricsForLastWeek(totem, component) {
    const column = mapComponentToColumn(component);
    if (!column) {
        throw new Error(`Componente inválido: ${component}`);
    }

    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia_semana,
            ROUND(AVG(${column}), 2) AS componente_avg
        FROM Desempenho
        WHERE fkTotem = ${totem}
        AND WEEK(dtHora) = WEEK(CURDATE()) - 1
        AND YEAR(dtHora) = YEAR(CURDATE())
        GROUP BY dia_semana
        ORDER BY FIELD (dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;
    return db.executar(query);
}


function getTopMetrics() {
    const query = `
        (
            SELECT 
                fkTotem AS totem,
                'CPU' AS componente,
                MAX(cpu_usage) AS valor
            FROM Desempenho
            GROUP BY fkTotem
            ORDER BY valor DESC
            LIMIT 1
        )
        UNION ALL
        (
            SELECT 
                fkTotem AS totem,
                'RAM' AS componente,
                MAX(memory_perc) AS valor
            FROM Desempenho
            GROUP BY fkTotem
            ORDER BY valor DESC
            LIMIT 1
        )
        UNION ALL
        (
            SELECT 
                fkTotem AS totem,
                'Disco' AS componente,
                MAX(disk_perc) AS valor
            FROM Desempenho
            GROUP BY fkTotem
            ORDER BY valor DESC
            LIMIT 1
        )
        ORDER BY valor DESC
        LIMIT 3;
    `;
    return db.executar(query);
}


module.exports = {
    getMetricsForCurrentWeek,
    getMetricsForLastWeek,
    getTopMetrics,
};
