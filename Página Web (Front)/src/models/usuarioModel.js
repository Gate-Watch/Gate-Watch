var database = require("../database/config");

function autenticar(email, senha) {
    console.log("Autenticando o usuário...");
    var instrucaoSql = `
        SELECT 
            idFuncionario, 
            nome, 
            email,
            cargo,  -- Certifique-se de que o cargo está sendo selecionado
            fkCompanhia
        FROM 
            Funcionario 
        WHERE 
            email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function verificarCodigoSeguranca(codSeg) {
    const instrucao = `
        SELECT idCompanhia 
        FROM Companhia 
        WHERE chave_seguranca = '${codSeg}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(idCompanhia, cargo, nome, email, senha) {
    const instrucao = `
        INSERT INTO Funcionario (nome, cargo, email, senha, fkCompanhia)
        VALUES ('${nome}', '${cargo}', '${email}', '${senha}', ${idCompanhia});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    verificarCodigoSeguranca,
    cadastrar
};
