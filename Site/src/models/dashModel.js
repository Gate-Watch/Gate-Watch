const db = require('../database/connection');

async function calcularMediaSemanal(totem, semana, componente) {
    const inicioSemana = (semana - 1) * 7 + 1;
    const fimSemana = inicioSemana + 6;

    const query = `
        SELECT 
            DAYNAME(dtHora) AS dia,
            AVG(${componente}_perc) AS media
        FROM Desempenho
        WHERE fkTotem = ? 
          AND DAYOFMONTH(dtHora) BETWEEN ? AND ?
        GROUP BY DAYOFWEEK(dtHora)
        ORDER BY FIELD(DAYNAME(dtHora), 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;

    const [result] = await db.execute(query, [totem, inicioSemana, fimSemana]);

    const dias = result.map(row => row.dia);
    const medias = result.map(row => parseFloat(row.media.toFixed(2)));

    return { dias, medias };
}

module.exports = { calcularMediaSemanal };
