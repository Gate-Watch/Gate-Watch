var database = require("../database/config");

function autenticar(email, senha, chaveSeguranca) {
    console.log("Autenticando o usuario...");
    var instrucaoSql = `
    SELECT 
        idUsuario, 
        nome, 
        email,
        senha
    FROM 
        usuario 
    WHERE email = '${email}' AND senha = '${senha}' AND chaveSeguranca = '${chaveSeguranca}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idEmpresa, chaveSeguranca, cargo, nome, email, senha) {
    console.log("Cadastrando o usuario...");

    var instrucaoSql = `
        INSERT INTO usuario (fkEmpresa, chaveSeguranca, cargo, nome, email, senha) VALUES ('${idEmpresa}', '${chaveSeguranca}', '${cargo}', '${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};