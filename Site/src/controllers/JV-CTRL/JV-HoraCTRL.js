var horaModel = require("../../models/JV-Model/JV-HoraModel");

async function calcularFaixaHorarioMaiorUso(req, res) {
    try {
        const resultado = await horaModel.calcularFaixaHorarioMaiorUso();
        console.log("Resultado da consulta no backend:", resultado);
        
        if (resultado) {
            res.json(resultado); 
        } else {
            res.status(404).json({ message: "Nenhum horário encontrado" }); 
        }
    } catch (error) {
        console.error("Erro ao calcular faixa horário maior uso:", error);
        res.status(500).json({ message: "Erro interno do servidor" }); 
    }
}


module.exports = {
    calcularFaixaHorarioMaiorUso
}
