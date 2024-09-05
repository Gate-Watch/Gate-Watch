var usuarioModel = require("../models/usuarioModel");

async function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        try {
            const resultado = await usuarioModel.autenticar(email, senha);
            if (resultado.length === 1) {
                res.json({
                    id: resultado[0].idFuncionario,
                    nome: resultado[0].nome,
                    email: resultado[0].email,
                    cargo: resultado[0].cargo,
                    fkCompanhia: resultado[0].fkCompanhia
                });
            } else if (resultado.length === 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        } catch (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    }
}

async function verificarCodigoSeguranca(req, res) {
    var codSeg = req.body.codSeg;

    try {
        const result = await usuarioModel.verificarCodigoSeguranca(codSeg);
        if (result.length > 0) {
            res.json({ idCompanhia: result[0].idCompanhia });
        } else {
            res.status(400).send("Código de segurança inválido.");
        }
    } catch (erro) {
        console.log(erro);
        res.status(500).send("Erro ao verificar o código de segurança.");
    }
}

async function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var codSeg = req.body.codSegServer;
    var cargo = req.body.cargoServer;

    if (!nome || !email || !senha || !codSeg || !cargo) {
        res.status(400).send("Todos os campos devem ser preenchidos.");
        return;
    }

    try {
        // Verificar o código de segurança e obter o id da companhia
        const result = await usuarioModel.verificarCodigoSeguranca(codSeg);
        if (result.length === 0) {
            return res.status(400).send("Código de segurança inválido.");
        }

        const idCompanhia = result[0].idCompanhia;

        // Realizar o cadastro do funcionário
        await usuarioModel.cadastrar(idCompanhia, cargo, nome, email, senha);

        res.json({ message: "Usuário cadastrado com sucesso!" });
    } catch (erro) {
        console.log(erro);
        res.status(500).send("Erro ao realizar o cadastro.");
    }
}

module.exports = {
    autenticar,
    verificarCodigoSeguranca,
    cadastrar
};
