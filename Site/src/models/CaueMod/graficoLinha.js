const { query } = require('express');
const db = require('../../database/config');

function getGraficoLinha(linhaAno){ 
    const query = ` SELECT mes_ano, 
    ROUND(AVG(total_alertas),0) AS media_alertas_por_mes 
    FROM ( 
    SELECT date_format(dtAlerta, '%Y-%m') as mes_ano, 
    COUNT(*) AS total_alertas 
    FROM alerta 
    WHERE YEAR(dtAlerta) = ${linhaAno} 
    GROUP BY date_format(dtAlerta, '%Y-%m') ) 
    AS subconsulta GROUP BY mes_ano; `; 


    console.log("Executing query: ", query); 
    return db.executar(query); }

    function getGraficoBarraLateral(anoBarraLateral, mesBarraLateral) {
        let query;
    
        if (mesBarraLateral === 0) {
            query = `SELECT YEAR(dtHora) AS ano, 
                ROUND(AVG(disk_usage), 0) AS disk_media, 
                ROUND(AVG(memory_usage), 0) AS memory_media, 
                ROUND(AVG(cpu_usage), 0) AS cpu_media 
                FROM desempenho WHERE YEAR(dtHora) = ${anoBarraLateral} 
                GROUP BY ano 
                ORDER BY ano;`;
        } else {
            query = `SELECT 
                YEAR(dtHora) AS ano,
                MONTH(dtHora) AS mes,
                AVG(cpu_usage) AS cpu_media,
                AVG(memory_usage) AS memory_media,
                AVG(disk_usage) AS disk_media
                FROM desempenho
                WHERE YEAR(dtHora) = ${anoBarraLateral} 
                AND MONTH(dtHora) = ${mesBarraLateral}
                GROUP BY YEAR(dtHora), MONTH(dtHora)
                ORDER BY YEAR(dtHora), MONTH(dtHora);`;
        }
    
        console.log("Executing query: ", query);
        return db.executar(query);
    }
    
    function getGraficoDonut(codigo_Totem) {
        let query;
        query = `
        SELECT COUNT(CASE WHEN componente = 'cpu' THEN 1 END) AS contagemCpu, 
        COUNT(CASE WHEN componente = 'disco' THEN 1 END) AS contagemDisco,
        COUNT(CASE WHEN componente = 'memoria' THEN 1 END) as contagemMemoria
        FROM alerta LEFT JOIN totem ON fkTotem = idTotem WHERE codigo_serie = '${codigo_Totem}';
        `
        return db.executar(query);
    }    
 
    function getUltimoAlerta(codigo_Totem) {
        let query;
        query = `
        select time(dtAlerta) as hora, 
        date_format(dtAlerta, '%d/%m/%Y') as dia 
        from alerta join totem on fkTotem = idTotem where 
        codigo_serie = '${codigo_Totem}' 
        order by date(dtAlerta) desc, 
        time(dtAlerta) desc limit 1;
        `
        return db.executar(query);
    }    

    function getGraficoComparacao(codigo_Totem, anoComparacao) {
        let query;
        query = `
        SELECT 
    YEAR(dtAlerta) AS ano,
    MONTH(dtAlerta) AS mes,
    COUNT(CASE WHEN componente = 'disco' THEN 1 END) AS contagemDisco,
    COUNT(CASE WHEN componente = 'cpu' THEN 1 END) AS contagemCpu,
    COUNT(CASE WHEN componente = 'memoria' THEN 1 END) AS contagemMemoria
FROM alerta
LEFT JOIN totem
    ON fkTotem = idTotem
WHERE codigo_serie = '${codigo_Totem}'
    AND YEAR(dtAlerta) = ${anoComparacao}
GROUP BY YEAR(dtAlerta), MONTH(dtAlerta);
        `
        return db.executar(query);
    }    

    function getAnoComparacao(codigo_Totem){
        const query = `
            select YEAR(dtAlerta) as ano 
            from alerta join totem on fkTotem = idTotem 
            where codigo_serie = '${codigo_Totem}' group by year(dtAlerta) order by YEAR(dtAlerta) desc;
        `
        return db.executar(query)
    
    }

 module.exports = { 
     getGraficoLinha,
     getGraficoBarraLateral,
     getGraficoDonut,
     getUltimoAlerta,
     getGraficoComparacao,
     getAnoComparacao
 };
 