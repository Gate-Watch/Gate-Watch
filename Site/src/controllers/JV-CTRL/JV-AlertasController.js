const alertaModel = require("../../models/JV-Model/JV-AlertasModel");

async function totenAlertas5(req, res) {
    try {
        const resultado = await alertaModel.obetertop5();

        console.log("Resultado obtido da consulta SQL:", resultado); 

        if (Array.isArray(resultado) && resultado.length > 0) {
            res.json(resultado);  
        } else {
            console.log("Nenhum dado encontrado para os Top 5 Totens.");
            res.status(404).send("Nenhum dado encontrado para os Top 5 Totens.");
        }
    } catch (erro) {
        console.error("Erro ao obter os Top 5 Totens com mais alertas:", erro);
        res.status(500).json({ erro: erro.sqlMessage || "Erro interno do servidor" });
    }
}


module.exports = {
    totenAlertas5
};
