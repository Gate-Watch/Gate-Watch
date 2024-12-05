var componentes;
var mesBarraLateral = '';
var anoBarraLateral = '2024';
let mediaComponentes = [];


async function fetchBarraLateral() {
    try {
        const response = await fetch(`/apiGraficoLinha/barraLateral?anoBarraLateral=${anoBarraLateral}&mesBarraLateral=${mesBarraLateral}`);
        const data = await response.json();
        console.log('Buscando dados para o ano: ', anoBarraLateral, 'e mês: ', mesBarraLateral);

        if (!anoBarraLateral) {
            console.error("O parâmetro 'anoBarraLateral' é obrigatório");
            return;
        }

        // Faz o fetch para a API com o valor de anoBarraLateral e mesBarraLateral
       
        if (!Array.isArray(data)) {
            console.error('A resposta da API não é um array:', data);
            return;
        }

        if (data.length === 0) {
            console.error('Nenhum dado encontrado.');
            return;
        }

        // Popula dadosPorAno1 com os valores de alertas por mês
        data.forEach((dados) => {
            mediaComponentes = [
                dados.memory_media, 
                dados.disk_media, 
                dados.cpu_media
            ];
        });
        

        console.log(mediaComponentes);
        atualizarComponentes();
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico de linha:', error);
    }
}

function atualizarComponentes() {
    if (componentes) {
        componentes.destroy();
    }

    var options = {
        series: [{
            name: 'Quantidade',
            data: mediaComponentes
        }],
        chart: {
            type: 'bar',
            height: 200,
            width: 400
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#18204B'],
        xaxis: {
            categories: ['RAM', 'DISCO', 'CPU'],
        },
    };

    componentes = new ApexCharts(document.querySelector('#graficoComponentes'), options);
    componentes.render();
}

function selectAnoBarra() {
    var criterioGraficoB = document.getElementById("anoSelectBarraLateral").value;
    console.log('Selecionado ano linha:', criterioGraficoB);
    anoBarraLateral = criterioGraficoB;
    fetchBarraLateral();
}

function selectMesBarra() {
    var criterioGraficoC = document.getElementById("mesSelect").value;
    console.log('Selecionado ano linha:', criterioGraficoC);
    mesBarraLateral = criterioGraficoC;
    fetchBarraLateral();
}

// Inicializa o gráfico
fetchBarraLateral();
