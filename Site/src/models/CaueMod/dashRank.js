const db = require('../../database/config');

function getTotens(ordenarPor) {
    let query = `
         SELECT 
    Totem.codigo_serie AS 'Código de Série', 
    COUNT(Alerta.idAlerta) AS 'Valor Alertas',
    MAX(Alerta.dtAlerta) AS 'Data do Primeiro Alerta' ,
    nome_totem
    FROM Totem 
     LEFT JOIN Alerta ON Totem.idTotem = Alerta.fkTotem `;

    // Adiciona a cláusula ORDER BY conforme o critério recebido
    if (ordenarPor == 'qtdAlertas') {
        query += ' GROUP BY Totem.codigo_serie, nome_totem ORDER BY count(alerta.idAlerta) desc;'; // Ordenar por alertas de forma decrescente
    } else if (ordenarPor == 'nome') {
        query += ' GROUP BY Totem.codigo_serie, nome_totem ORDER BY Totem.codigo_serie ASC;'; // Ordenar por código de série (nome) de forma crescente
    } else if (ordenarPor == 'alertaRecente') {
        query += ' GROUP BY Totem.codigo_serie, nome_totem ORDER BY MAX(alerta.dtAlerta) DESC;'
    } 
    //else if (ordenarPor == 'anoFabricacao') {
        //query += ' GROUP BY Totem.codigo_serie ORDER BY Totem.ano_Totem DESC;'
    //}

    return db.executar(query);
}

function getQuantidadeTotem() {
    const query = `
        SELECT COUNT(idTotem) AS count FROM Totem;
    `;
    return db.executar(query);
}

function getProcessosWordCloud(anoWord){
    let query = `
select 
 nomeProcesso,
 ROUND(avg(total_processo), 1) as 'valores'
 from 
(SELECT 
	nomeProcesso,
    COUNT(*) AS total_processo,
    DATE_FORMAT(dataProcesso, '%m-%Y') AS mes
FROM Processos where year(dataProcesso) = ${anoWord} GROUP BY nomeProcesso, mes) AS subselect group by nomeProcesso;`;

   return db.executar(query)
} 


function getAnoDisponivelWord(){
    const query = `
        SELECT distinct Year(dtAlerta) as ano from Alerta order by ano desc;
    `
    return db.executar(query)

}

function getAnoDisponivelGraficoLinha(){
    const query = `
        SELECT distinct Year(dtAlerta) as ano from Alerta order by ano desc;
    `
    return db.executar(query)

}

function getAnoDisponivelGraficoBarrasLateral(){
    const query = `
        SELECT distinct Year(dtHora) as ano from Desempenho order by ano desc;
    `
    return db.executar(query)

}

function getMesDisponivelGraficoBarrasLateral(){
    const query = `
        SELECT distinct month(dtHora) as ano from Desempenho order by ano;
    `
    return db.executar(query)

}

module.exports = { 
    getTotens, 
    getQuantidadeTotem,
    getProcessosWordCloud,
    getAnoDisponivelWord,
    getAnoDisponivelGraficoLinha,
    getAnoDisponivelGraficoBarrasLateral,
    getMesDisponivelGraficoBarrasLateral
};
