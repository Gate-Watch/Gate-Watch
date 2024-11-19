const regressaoModel = require('../models/regressaoModel');
const ss = require('simple-statistics');  // Para cálculos de regressão e estatísticas

async function getMetricasSemanal(req, res) {
    try {
        const { totem, semana, component } = req.query;

        // Validação dos parâmetros
        if (!totem || !semana || !component) {
            return res.status(400).json({ error: "Parâmetros inválidos na requisição." });
        }

        const componentesValidos = ["cpu", "memory", "disk"];
        if (!componentesValidos.includes(component.toLowerCase())) {
            return res.status(400).json({ error: `Componente inválido: ${component}` });
        }

        // Dados simulados para este exemplo
        const data = [
            { dia_semana: 'Sunday', cpu_usage_avg: 54.93, memory_perc_avg: 49.76, disk_perc_avg: 52.2 },
            { dia_semana: 'Monday', cpu_usage_avg: 51.31, memory_perc_avg: 42.88, disk_perc_avg: 53.32 },
            { dia_semana: 'Tuesday', cpu_usage_avg: 45.26, memory_perc_avg: 59.48, disk_perc_avg: 49.18 },
            { dia_semana: 'Wednesday', cpu_usage_avg: 45.2, memory_perc_avg: 44.55, disk_perc_avg: 55.07 },
            { dia_semana: 'Thursday', cpu_usage_avg: 46.41, memory_perc_avg: 44.4, disk_perc_avg: 50.7 },
            { dia_semana: 'Friday', cpu_usage_avg: 52.16, memory_perc_avg: 50.67, disk_perc_avg: 49.56 },
            { dia_semana: 'Saturday', cpu_usage_avg: 55.84, memory_perc_avg: 50.51, disk_perc_avg: 49.01 }
        ];

        // Chamada da função de regressão
        const result = calcularRegressao(data, component);

        return res.status(200).json(result);
    } catch (error) {
        console.error("Erro no cálculo de regressão:", error.message);
        return res.status(500).json({ error: error.message });
    }
}



function calcularRegressao(data, componenteEscolhido) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Dados inválidos fornecidos para regressão.");
    }

    // Mapeamento de componente para a chave correta nos dados
    const mapeamentoComponentes = {
        cpu: "cpu_usage_avg",
        memory: "memory_perc_avg",
        disk: "disk_perc_avg",
    };

    const componenteChave = mapeamentoComponentes[componenteEscolhido.toLowerCase()];
    if (!componenteChave) {
        throw new Error(`Componente ${componenteEscolhido} não é válido.`);
    }

    // Converte os valores com base no componente escolhido
    const valores = data.map(item => {
        const valor = item[componenteChave];
        if (valor === undefined) {
            throw new Error(`Componente ${componenteEscolhido} não encontrado nos dados.`);
        }
        return valor;
    });

    // Verifica se há dados suficientes para regressão
    const diasIndex = valores.map((_, i) => i); // Índices correspondentes aos dias
    if (valores.length < 2) {
        throw new Error("Não há valores suficientes para calcular a regressão.");
    }

    // Cálculo de regressão linear
    const regressionData = diasIndex.map((x, i) => [x, valores[i]]);
    const regression = ss.linearRegression(regressionData);
    const predict = x => regression.m * x + regression.b;

    // Previsões
    const previsoes = diasIndex.map(dia => predict(dia));

    // Calcular limites para outliers
    const quartis = ss.quantileSorted(valores.sort((a, b) => a - b), [0.25, 0.75]);
    const iqr = quartis[1] - quartis[0];
    const limiteInferior = quartis[0] - 1.5 * iqr;
    const limiteSuperior = quartis[1] + 1.5 * iqr;

    const previsoesMin = previsoes.map(p => Math.max(p, limiteInferior));
    const previsoesMax = previsoes.map(p => Math.min(p, limiteSuperior));

    return {
        previsoesAtuais: valores,
        previsoesMin,
        previsoesMax,
        dias: diasIndex,
        m: regression.m,
        b: regression.b,
    };
}




module.exports = { getMetricasSemanal };
