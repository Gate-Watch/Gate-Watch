var database = require("../database/config");

// model cpu
function dashJoaoCpu() {
    const instrucaoSql = `
    SELECT 
    cpu_usage, 
    dtHora 
FROM 
    desempenho 
WHERE 
    fkTotem = 1
ORDER BY 
    dtHora DESC;
`;
    return database.executar(instrucaoSql);
}


function dashJoaoCpu2() {
    const instrucaoSql = `
    SELECT 
    cpu_usage, 
    dtHora 
FROM 
    desempenho 
WHERE 
    fkTotem = 2
ORDER BY 
    dtHora DESC;
`;
    return database.executar(instrucaoSql);
}

function dashJoaoCpu3() {
    const instrucaoSql = `
    SELECT 
    cpu_usage, 
    dtHora 
FROM 
    desempenho 
WHERE 
    fkTotem = 3
ORDER BY 
    dtHora DESC;
`;
    return database.executar(instrucaoSql);
}

//model ram
function dashJoaoRam() {
    const instrucaoSql = `
    SELECT 
    memory_perc, 
    dtHora 
FROM 
    desempenho 
WHERE 
    fkTotem = 1
ORDER BY 
    dtHora DESC;
`;
    return database.executar(instrucaoSql);
}

function dashJoaoRam2() {
    const instrucaoSql = `
    SELECT 
    memory_perc, 
    dtHora 
FROM 
    desempenho 
WHERE 
    fkTotem = 1
ORDER BY 
    dtHora DESC;
`;
    return database.executar(instrucaoSql);
}

function dashJoaoRam3() {
    const instrucaoSql = `
    SELECT 
    memory_perc, 
    dtHora 
FROM 
    desempenho 
WHERE 
    fkTotem = 1
ORDER BY 
    dtHora DESC;
`;
    return database.executar(instrucaoSql);
}

function dashDisco() {
    const instrucaoSql = `
    SELECT 
    disk_usage, 
    disk_total 
FROM 
    desempenho 
WHERE 
    fkTotem = 1
ORDER BY 
    dtHora DESC
    limit 1;
`;
    return database.executar(instrucaoSql);
}
function dashDisco2() {
    const instrucaoSql = `
    SELECT 
    disk_usage, 
    disk_total
FROM 
    desempenho 
WHERE 
    fkTotem = 2
ORDER BY 
    dtHora DESC
    limit 1;
`;
    return database.executar(instrucaoSql);
}
function dashDisco3() {
    const instrucaoSql = `
    SELECT 
    disk_usage, 
    disk_total 
FROM 
    desempenho 
WHERE 
    fkTotem = 3
ORDER BY 
    dtHora DESC
    limit 1;
`;
    return database.executar(instrucaoSql);
}

module.exports = {
    dashJoaoCpu,
    dashJoaoCpu2,
    dashJoaoCpu3,
    dashJoaoRam,
    dashJoaoRam2,
    dashJoaoRam3,
    dashDisco,
    dashDisco2,
    dashDisco3
};
