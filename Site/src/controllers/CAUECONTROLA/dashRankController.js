const dashModel = require('../../models/CaueMod/dashRank');

async function getTotens(req, res) {
    console.log("Chamando getTotens");
    try {
        const ordenarPor = req.query.ordenarPor || 'qtdAlertas'; // Pega o critério de ordenação (padrão é 'nome')
        const result = await dashModel.getTotens(ordenarPor); // Passa o critério para o modelo

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
        }

        res.json(result); // Retorna os totens ordenados
    } catch (error) {
        console.error("Erro ao buscar métricas diárias:", error);
        res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
    }
}

async function getQuantidadeTotem(req, res) {
    console.log("Chamando getQuantidadeTotem");
    try {
        const result = await dashModel.getQuantidadeTotem(); // Executa a função assíncrona do modelo
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
        }
        res.json(result); // Retorna a quantidade de totens
    } catch (error) {
        console.error("Erro ao buscar métricas diárias:", error);
        res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
    }
}

async function getProcessosWordCloud(req, res) {
    console.log("Chamando getProcessosWordCloud");
    try {
        const anoWord = req.query.anoWord || '2024';
        const result = await dashModel.getProcessosWordCloud(anoWord); // Passa o critério para o modelo

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhum processo encontrado.' });
        }

        res.json(result); // Retorna os totens ordenados
    } catch (error) {
        console.error("Erro ao buscar processos:", error);
        res.status(500).json({ error: 'Erro ao buscar processos.' });
    }
}

async function getAnoDisponivelWord(req, res) {
    console.log("Chamando getAnoDisponível WordCloud");
    try {
        const result = await dashModel.getAnoDisponivelWord(); // Executa a função assíncrona do modelo
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
        }
        res.json(result); // Retorna a quantidade de totens
    } catch (error) {
        console.error("Erro ao buscar métricas diárias:", error);
        res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
    }
}

async function getAnoDisponivelGraficoLinha(req, res) {
    console.log("Chamando getAnoDisponível Grafico Linha");
    try {
        const result = await dashModel.getAnoDisponivelGraficoLinha(); // Executa a função assíncrona do modelo
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
        }
        res.json(result); // Retorna a quantidade de totens
    } catch (error) {
        console.error("Erro ao buscar métricas diárias:", error);
        res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
    }
}

async function getAnoDisponivelGraficoBarrasLateral(req, res) {
    console.log("Chamando getAnoDisponível Grafico Linha");
    try {
        const result = await dashModel.getAnoDisponivelGraficoBarrasLateral(); // Executa a função assíncrona do modelo
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
        }
        res.json(result); // Retorna a quantidade de totens
    } catch (error) {
        console.error("Erro ao buscar métricas diárias:", error);
        res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
    }
}

async function getMesDisponivelGraficoBarrasLateral(req, res) {
    console.log("Chamando getAnoDisponível Grafico Linha");
    try {
        const result = await dashModel.getMesDisponivelGraficoBarrasLateral(); // Executa a função assíncrona do modelo
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nenhuma métrica encontrada.' });
        }
        res.json(result); // Retorna a quantidade de totens
    } catch (error) {
        console.error("Erro ao buscar métricas diárias:", error);
        res.status(500).json({ error: 'Erro ao buscar métricas diárias.' });
    }
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
