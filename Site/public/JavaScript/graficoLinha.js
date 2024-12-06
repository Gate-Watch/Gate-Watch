var linhaAno = '';  // Defina a variável linhaAno uma única vez fora de qualquer função

let dadosPorAno = [];

async function fetchGraficoLinha() {
    try {
        dadosPorAno = [];  // Limpa os dados antes de atualizar

        // Verifica se linhaAno está sendo atualizado corretamente
        console.log('Buscando dados para o ano: ', linhaAno);

        if (!linhaAno) {
            console.error("O parâmetro 'linhaAno' é obrigatório");
            return;
        }

        // Faz o fetch para a API com o valor de linhaAno
        const response = await fetch(`/apiGraficoLinha/totens/anoLinha?linhaAno=${linhaAno}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('A resposta da API não é um array:', data);
            return;
        }

        if (data.length === 0) {
            console.error('Nenhum processo encontrado.');
            return;
        }

        // Popula dadosPorAno com os valores de alertas por mês
        data.forEach((dados) => {
            dadosPorAno.push(dados["media_alertas_por_mes"]);
        });

        atualizarGrafico();
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico de linha:', error);
    }
}

window.fetchGraficoLinha = fetchGraficoLinha;

let graficoAlerta = null;

function atualizarGrafico() {
    if (graficoAlerta) {
        graficoAlerta.destroy();  // Destroi o gráfico anterior antes de criar o novo
    }

    const options = {
        series: [{ name: "Alertas", data: dadosPorAno }],
        chart: {
            height: 230,
            type: "line",
            dropShadow: {
                enabled: true,
                color: "rgb(24, 32, 75)",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
            },
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["rgb(24, 32, 75)", "#545454"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
            },
        },
        markers: {
            size: 1,
        },
        xaxis: {
            categories: [
                "Jan", "Fev", "Mar", "Abr", "Maio", "Jun",
                "Jul", "Ago", "Set", "Out", "Nov", "Dez ",
            ],
        },
        yaxis: {
            title: {
                text: "Alertas",
            },
            min: 0,
            max: 100,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    graficoAlerta = new ApexCharts(
        document.querySelector("#graficoAlerta"),
        options
    );
    graficoAlerta.render();
}

function selectAnoLinha() {
    var criterioGraficoL = document.getElementById("graficoLinhaSelect").value;
    console.log('Selecionado ano linha:', criterioGraficoL);  // Adicione logs para verificar o valor
    linhaAno = criterioGraficoL;  // Atualiza a variável linhaAno com o valor selecionado
    fetchGraficoLinha();  // Chama a função para buscar os dados e atualizar o gráfico
}

document.addEventListener('DOMContentLoaded', () => {
    selectAnoLinha();  // Inicializa o gráfico com o ano padrão
});
