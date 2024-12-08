var graficoDonut = null;
var graficoRadar = null;
var graficoComparacao = null;
var codigo_serie = '';
let porcentagemComponente = [];
let porcentagemComponente2 = [];
let componentesComparacao = [
    { name: 'CPU', data: Array(12).fill(0) },
    { name: 'RAM', data: Array(12).fill(0) },
    { name: 'Disco', data: Array(12).fill(0) }
];

var anoComparacao = '2024';

async function fetchTotens(ordenarPor) {
    try {
        const response = await fetch(`/apiCaue/totens?ordenarPor=${ordenarPor}`);
        const data = await response.json();

        if (data.length === 0) {
            console.error('Nenhum totem encontrado.');
            return;
        }

        const botaoContainer = document.getElementById('botao-container');
        botaoContainer.innerHTML = '';

        data.forEach(item => {
            const botao = document.createElement('button');
            botao.textContent = `Totem: ${item["nome_totem"]} // ${item["Valor Alertas"]} alertas`;

            botao.addEventListener('click', function() {
                mostrarTotemNaTela(item["nome_totem"]);
                fetchGraficoDonut(item["Código de Série"]);
                fetchDiaEHora(item["Código de Série"]);
                fetchGraficoRadar(item["Código de Série"]);
                fetchGraficoComparacao(item["Código de Série"]);
                codigo_serie = '';
                codigo_serie = item['Código de Série'];
            });

            botaoContainer.appendChild(botao);
        });
    } catch (error) {
        console.error('Erro ao buscar totens:', error);
    }
}

function mostrarTotemNaTela(nomeTotem) {
    const smileOverlay = document.getElementById('smileOverlay');
    const smileMessage = document.getElementById('smileMessage');
    
    smileMessage.textContent = `${nomeTotem}`;
    smileOverlay.style.display = 'flex';

    smileOverlay.addEventListener('click', fecharOverlay);
}

function ordenarTotens() {
    const criterio = document.getElementById('ordenar-por').value;
    fetchTotens(criterio);
}

async function fetchGraficoDonut(codigo_serie) {
    try {
        const response = await fetch(`/apiGraficoLinha/graficoDonut?codigo_totem=${codigo_serie}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('A resposta da API não é um array:', data);
            return;
        }

        if (data.length === 0) {
            console.error('Nenhum dado encontrado.');
            return;
        }

        porcentagemComponente = [
            data[0].contagemCpu,
            data[0].contagemMemoria,
            data[0].contagemDisco
        ];

        atualizarValoresPorcentagem();
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico de linha:', error);
    }
}

function atualizarValoresPorcentagem() {
    if (graficoDonut) {
        graficoDonut.destroy();
        graficoDonut = null;
    }

    var options = {
        series: porcentagemComponente,
        chart: {
            type: 'donut',
            width: 250,
            height: 155
        },
        labels: ['CPU', 'Memória', 'Disco'],
        colors: ['#000000', '#2b2b2b', '#111652'],
        plotOptions: {
            pie: {
                donut: {
                    size: '60%'
                },
                dataLabels: {
                    enabled: true,
                    offset: 0,  // Ajusta a distância das labels
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        colors: ['#000000', '#2b2b2b', '#111652']
                    },
                    formatter: function(val, opts) {
                        return opts.w.globals.labels[opts.seriesIndex] + ': ' + val + '%';
                    },
                    dropShadow: {
                        enabled: false
                    }
                }
            }
        },
        legend: {
            position: 'right',  // Muda a posição da legenda para a direit
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 50
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    
    graficoDonut = new ApexCharts(document.querySelector("#rosquinhaComponentes"), options);
    graficoDonut.render();
    
}

////////////////////////////////HORA E DIA/////////////////////////////////////////////////////////////////////
async function fetchDiaEHora(codigo_serie) {
    try {
        const response = await fetch(`/apiGraficoLinha/ultimoAlerta?codigo_totem=${codigo_serie}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('A resposta da API não é um array:', data);
            return;
        }

        if (data.length === 0) {
            console.error('Nenhum dado encontrado.');
            return;
        }
        
        data.forEach(item => {
            const horaContainer = document.getElementById('HoraUlimoAlerta');
            const DiaContainer = document.getElementById('DiaUltimoAlerta');
            DiaContainer.innerHTML = '';
            horaContainer.innerHTML = '';
            horaContainer.textContent = item["hora"];
            DiaContainer.textContent = item["dia"];
        });
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico de linha:', error);
    }
}

//////////////////////////////////////////RADAR//////////////////////////////////////////////////////////
async function fetchGraficoRadar(codigo_serie) {
    try {
        const response = await fetch(`/apiGraficoLinha/graficoDonut?codigo_totem=${codigo_serie}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('A resposta da API não é um array:', data);
            return;
        }

        if (data.length === 0) {
            console.error('Nenhum dado encontrado.');
            return;
        }

        porcentagemComponente2 = [
            data[0].contagemCpu,
            data[0].contagemMemoria,
            data[0].contagemDisco
        ];

        atualizarValoresPorcentagem2();
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico de linha:', error);
    }
}

function atualizarValoresPorcentagem2() {
    if (graficoRadar) {
        graficoRadar.destroy();
        graficoRadar = null;
    }

    var options = {
        series: porcentagemComponente2,
        chart: {
            type: 'polarArea',
            width: 250,
            height: 155,
        },
        labels: ['CPU', 'Memória', 'Disco'],
        fill: {
            type: 'gradient',  // Tipo de preenchimento (sólido, gradiente)
            gradient: {
                shade: 'dark',  // Escuro
                gradientToColors: ['#2e2e2e', '#1e1e1e'],  // Gradiente do preto para azul escuro
                stops: [0, 100]
            },
            colors: ['#003366', '#808080', '#000000']  // Cores específicas para cada segmento: azul escuro, cinza e preto
        },
        plotOptions: {},
        dataLabels: {
            enabled: false,
            style: {}
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['#1e2a3a']  // Cor da borda, azul escuro
        },
        xaxis: {
            categories: ['CPU', 'Memória', 'Disco'],  // Define as categorias
            labels: {
                style: {
                    colors: ['#ffffff']  // Cor das labels do eixo (branco para contraste)
                }
            }
        },
        yaxis: {
            show: true,  // Garante que a escala do y seja visível
            labels: {
                style: {
                    colors: ['#ffffff'],  // Cor das labels do eixo (branco para contraste)
                    fontSize: '14px',  // Tamanho maior da fonte para os valores
                    fontWeight: 'bold'  // Negrito para destacar os valores
                }
            },
             // Quantidade de divisões na escala (ex: 0, 20, 40, 60, 80, 100)
        },
        legend: {
            labels: {
                colors: '#a1a1a1'  // Cor das labels na legenda (cinza claro)
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    
    graficoRadar = new ApexCharts(document.querySelector("#barraComponentes"), options);
    graficoRadar.render();
    
    
    
    
}
///////////////////////////////////////GRAFICOCOMPARACAO//////////////////////////////////////////////////


async function fetchGraficoComparacao(codigo_serie) { 
    if (!codigo_serie) {
        console.error("Parâmetros 'codigo_totem' são obrigatórios");
        return;
    }

    try {
        const response = await fetch(`/apiGraficoLinha/graficoComparacao?codigo_totem=${codigo_serie}&anoComparacao=${anoComparacao}`); 
        const data = await response.json(); 
        console.log('Buscando dados para o ano:', anoComparacao, 'e totem:', codigo_serie);

        if (!Array.isArray(data)) { 
            console.error('A resposta da API não é um array:', data);
            return;
        } 

        if (data.length === 0) { 
            console.error('Nenhum dado encontrado.'); 
            return; 
        }

        // Reinicia os dados antes de preencher
        componentesComparacao.forEach(componente => componente.data.fill(0));

        data.forEach((dados) => { 
            const mesIndex = dados["mes"] - 1; 
            componentesComparacao[0].data[mesIndex] = dados["contagemCpu"]; 
            componentesComparacao[1].data[mesIndex] = dados["contagemMemoria"]; 
            componentesComparacao[2].data[mesIndex] = dados["contagemDisco"]; 
        });

        console.log(componentesComparacao);
        atualizarComponentesComparacao(); 
    } catch (error) { 
        console.error('Erro ao buscar dados para o gráfico de comparação:', error); 
    }
}

function atualizarComponentesComparacao() { 
    if (graficoComparacao) { 
        graficoComparacao.destroy(); 
        graficoComparacao = null; 
    }

    var options = { 
        series: componentesComparacao, 
        chart: { 
            type: 'bar', 
            height: 240 
        },
        colors: ['#000000', '#335787', '#222651'], 
        plotOptions: { 
            bar: { 
                horizontal: false, 
                columnWidth: '55%', 
                borderRadius: 5, 
                borderRadiusApplication: 'end' 
            } 
        }, 
        dataLabels: { 
            enabled: false 
        }, 
        stroke: { 
            show: true, 
            width: 2, 
            colors: ['transparent'] 
        }, 
        xaxis: { 
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] 
        }, 
        fill: { 
            opacity: 1 
        } 
    };

    graficoComparacao = new ApexCharts(document.querySelector("#alertasLinha"), options);
    graficoComparacao.render();
}

function selectAnoComparacao() {
    var criterioGraficoD = document.getElementById("anoSelectComparacao").value;
    console.log('Selecionado ano gráfico Comparacao:', criterioGraficoD);
    if (graficoComparacao) {
        graficoComparacao.destroy();
    }
    if (criterioGraficoD) {
        anoComparacao = criterioGraficoD;
        fetchGraficoComparacao(codigo_serie, anoComparacao);
    } else {
        console.error("Ano de comparação não selecionado");
    }
}

///////////////////////////////////////FECHAR/////////////////////////////////////////////////////////////
function fecharOverlay() {
    const smileOverlay = document.getElementById('smileOverlay');
    smileOverlay.style.display = 'none';

    if (graficoDonut) {
        graficoDonut.destroy();
        graficoDonut = null;
    }

    if (graficoRadar) {
        graficoRadar.destroy();
        graficoRadar = null;
    }

    smileOverlay.removeEventListener('click', fecharOverlay);
}
