var exemploModel = require("../models/exemploModel");

function exemplo(req, res){
    var exempVar = req.body.exempVar;

    if(exempVar === undefined) res.status(400).send("Seu exempVar está undefined!");
    else {
        exemploModel.exemplo(exempVar)
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function(erro){
            console.log(`Erro na function exemplo de ExemploController`, erro)
        });
    }
}

module.exports = {
    exemplo
}