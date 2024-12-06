var wordArray = [];
var index = 1;
var anoWord = '';
var chart = null;
const valorPadrao = '2024';

async function fetchProcessos() {
    try {
        wordArray = [];
        const response = await fetch(`/apiCaue/processosWordCloud?anoWord=${anoWord}`);
        const data = await response.json();

        if (data.length === 0) {
            console.error('Nenhum processo encontrado.');
            return;
        }

        data.forEach((processo, index) => {
            wordArray.push({
                "x": processo["nomeProcesso"], 
                "value": processo["valores"], 
                "category": `Processos ${index + 1}`
            });

        });
        drawChart();
    } catch (error) {
        console.error('Erro ao ordenar os processos:', error);
    }
}

function drawChart() {
    
    const container = document.getElementById('wordCloudProcessos'); 
    container.innerHTML = '';
    anychart.onDocumentReady(function() {
        // create a tag (word) cloud chart
         chart = anychart.tagCloud(wordArray);
        
        // set a chart title with font color
        // chart.title('Word-Cloud Processos');
        chart.tooltip(false);

       chart.width(460); // Set width to 800px
        //chart.height(248); // Set height to 600px

        // set an array of angles at which the words will be laid out
        chart.angles([0]);

        chart.palette(["#18204B;", "#263A72", "#000000"]);

        // enable a color range
        chart.colorRange(false);

        // set the color range length
        chart.colorRange().length('70%');

        // display the word cloud chart
        chart.container(container);
        chart.draw();
    });
}

function selectAnoWord() {
    anoWord = '';
    var criterioWord = anoWordCloud.value;
    anoWord = criterioWord
    fetchProcessos(criterioWord);
}

document.addEventListener('DOMContentLoaded', () => { fetchTotens('qtdAlertas'); fetchProcessos(valorPadrao);
});
