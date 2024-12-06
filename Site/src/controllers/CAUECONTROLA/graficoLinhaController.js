const dashModel1 = require('../../models/CaueMod/graficoLinha');

async function getGraficoLinha(req, res) {
    console.log("Chamando graficoLinha com ano:", req.query.linhaAno);
    try {
        const linhaAno = req.query.linhaAno || '2024';
        if (!linhaAno) {
            throw new Error("O parâmetro 'linhaAno' é obrigatório");
        }

        const result = await dashModel1.getGraficoLinha(linhaAno); // Passa o critério para o modelo

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado.' });
        }

        res.json(result); // Retorna os totens ordenados
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: error.message });
    }
}

getGraficoLinha

async function getGraficoBarraLateral(req, res) {
    console.log("Chamando getGraficoBarraLateral com ano:", req.query.anoBarraLateral, "e mês:", req.query.mesBarraLateral);
    try {
        const anoBarraLateral = req.query.anoBarraLateral || '  2024';
        const mesBarraLateral = req.query.mesBarraLateral || 0;

        // Verifica se os parâmetros obrigatórios foram fornecidos
        if (!anoBarraLateral) {
            throw new Error("O parâmetro 'anoBarraLateral' é obrigatório");
        }
        
        const graficoMensal = await dashModel1.getGraficoBarraLateral(anoBarraLateral, mesBarraLateral);

        if (!graficoMensal || graficoMensal.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado.' });
        }

        res.json(graficoMensal); // Retorna os dados
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getGraficoDonut(req, res) {
    console.log("Chamando graficoDonut com Totem:", req.query.codigo_totem);
    try {
        const codigo_totem = req.query.codigo_totem;
        if (!codigo_totem) {
            throw new Error("O parâmetro 'Codigo do Totem' é obrigatório");
        }

        const result = await dashModel1.getGraficoDonut(codigo_totem); // Passa o critério para o modelo

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado.' });
        }

        res.json(result); // Retorna os totens ordenados
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getUltimoAlerta(req, res) {
    console.log("Chamando o ultimo alerta do Totem:", req.query.codigo_totem);
    try {
        const codigo_totem = req.query.codigo_totem;
        if (!codigo_totem) {
            throw new Error("O parâmetro 'Codigo do Totem' é obrigatório");
        }

        const result = await dashModel1.getUltimoAlerta(codigo_totem); // Passa o critério para o modelo

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado.' });
        }

        res.json(result); // Retorna os totens ordenados
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getGraficoComparacao(req, res) {
    console.log("Chamando getGrafico Comparacao com ano:", req.query.anoComparacao, "e totem:", req.query.codigo_totem);
    try {
        const codigo_totem = req.query.codigo_totem;
        const anoComparacao = req.query.anoComparacao;

        // Verifica se os parâmetros obrigatórios foram fornecidos
        if (!codigo_totem) {
            throw new Error("O parâmetro 'codigo totem' é obrigatório");
        }
        
        const graficoMensal = await dashModel1.getGraficoComparacao(codigo_totem, anoComparacao);

        if (!graficoMensal || graficoMensal.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado.' });
        }

        res.json(graficoMensal); // Retorna os dados
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getAnoComparacao(req, res) {
    console.log("Chamando o ultimo alerta do Totem:", req.query.codigo_totem);
    try {
        const codigo_totem = req.query.codigo_totem;
        if (!codigo_totem) {
            throw new Error("O parâmetro 'Codigo do Totem' é obrigatório");
        }

        const result = await dashModel1.getAnoComparacao(codigo_totem); // Passa o critério para o modelo

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado.' });
        }

        res.json(result); // Retorna os totens ordenados
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = { 
    getGraficoLinha,
    getGraficoBarraLateral,
    getGraficoDonut,
    getUltimoAlerta,
    getGraficoComparacao,
    getAnoComparacao
 };
