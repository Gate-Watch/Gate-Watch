const db = require('../database/config');

// mapeia os componentes do front para as colunas do bd
function mapComponente(componente) {
    const map = {
        Cpu: 'cpu_usage',
        Ram: 'memory_perc',
        Disco: 'disk_perc'
    };
    return map[componente] || null;
}

function getMetricasSemanaAtual(totem, componente) {
    const coluna = mapComponente(componente);
    if (!coluna) {
        throw new Error(`Componente inválido: ${componente}`);
    }

    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia_semana,
            ROUND(AVG(${coluna}), 2) AS componente_avg
        FROM Desempenho
        WHERE fkTotem = ${totem}
        AND WEEK(dtHora) = WEEK(CURDATE())
        AND YEAR(dtHora) = YEAR(CURDATE())
        GROUP BY dia_semana
        ORDER BY FIELD(dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;
    return db.executar(query);
}


function getMetricaSemanaPassada(totem, componente) {
    const coluna = mapComponente(componente);
    if (!coluna) {
        throw new Error(`Componente inválido: ${componente}`);
    }

    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia_semana,
            ROUND(AVG(${coluna}), 2) AS componente_avg
        FROM Desempenho
        WHERE fkTotem = ${totem}
        AND WEEK(dtHora) = WEEK(CURDATE()) - 1
        AND YEAR(dtHora) = YEAR(CURDATE())
        GROUP BY dia_semana
        ORDER BY FIELD (dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;
    return db.executar(query);
}


function getMaioresMetricas() {
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
    getMetricasSemanaAtual,
    getMetricaSemanaPassada,
    getMaioresMetricas,
};
