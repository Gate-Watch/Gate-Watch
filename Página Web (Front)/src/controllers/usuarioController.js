var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var chaveSeguranca = req.body.chaveSegurancaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (chaveSeguranca == undefined) {
        res.status(400).send("Sua chave de segurança está undefined!");
    } else {

        usuarioModel.autenticar(email, senha, chaveSeguranca)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

                if (resultadoAutenticar.length == 1) {
                    const usuario = resultadoAutenticar[0];
                    res.json({
                        id: usuario.idUsuario,
                        email: usuario.email,
                        nome: usuario.nome,
                        senha: usuario.senha
                                        });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
            );
    }
}

function cadastrar(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    var chaveSeguranca = req.body.chaveSegurancaServer;
    var cargo = req.body.cargoServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (chaveSeguranca == undefined) {
        res.status(400).send("Sua chave de segurança está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else {
        usuarioModel.cadastrar(idEmpresa, chaveSeguranca, cargo, nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
};