async function fetchAnos() {
    console.log('Iniciando a função fetchAnos');

    try {
        // Chama o backend com o critério de ordenação
        const response = await fetch(`/apiCaue/anoDisponivelWord`);
        
        // Verifica se a resposta é bem-sucedida
        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (data.length === 0) {
            console.error('Nenhum objeto/ano encontrado.');
            return;
        }

        const wordSelect = document.getElementById('anoWordCloud');

        wordSelect.innerHTML = '';

        data.forEach(item => {
            const selectWord = document.createElement('option');
            selectWord.textContent = `${item["ano"]}`;
            selectWord.value = item["ano"];
            wordSelect.appendChild(selectWord);
        });

        console.log('Opções adicionadas:', wordSelect.options);

    } catch (error) {
        console.error('Erro ao buscar objetos/anos:', error);
    }
///////////////////////////////////////////////////////////////////////////////
    try {
        // Chama o backend para o gráfico de linha
        const responseGraficoLinha = await fetch(`/apiCaue/anoDisponivelGraficoLinha`);
        
        // Verifica se a resposta é bem-sucedida
        const dataGraficoLinha = await responseGraficoLinha.json();
        console.log('Dados recebidos (gráfico de linha):', dataGraficoLinha);

        if (dataGraficoLinha.length === 0) {
            console.error('Nenhum objeto/ano encontrado para o gráfico de linha.');
            return;
        }

        const graficoLinhaOpcao = document.getElementById('graficoLinhaSelect');

        graficoLinhaOpcao.innerHTML = '';

        dataGraficoLinha.forEach(item => {
            const LinhaSelect = document.createElement('option');
            LinhaSelect.textContent = `${item["ano"]}`;
            LinhaSelect.value = item["ano"];
            graficoLinhaOpcao.appendChild(LinhaSelect);
        });

        console.log('Opções adicionadas (gráfico de linha):', graficoLinhaOpcao.options);

    } catch (error) {
        console.error('Erro ao buscar objetos/anos para o gráfico de linha:', error);
    }
///////////////////////////////////////////////////////////////////////////////
    try {
        // Chama o backend para o gráfico de barra lateral
        const responseBarraLateral = await fetch(`/apiCaue/anoDisponivelBarraLateral`);
        
        // Verifica se a resposta é bem-sucedida
        const dataBarraLateral = await responseBarraLateral.json();
        console.log('Dados recebidos (gráfico de barra lateral):', dataBarraLateral);

        if (dataBarraLateral.length === 0) {
            console.error('Nenhum objeto/ano encontrado para o gráfico de barra lateral.');
            return;
        }

        const graficoBarraOpcao = document.getElementById('anoSelectBarraLateral');

        graficoBarraOpcao.innerHTML = '';

        dataBarraLateral.forEach(item => {
            const BarraSelect = document.createElement('option');
            BarraSelect.textContent = `${item["ano"]}`;
            BarraSelect.value = item["ano"];
            graficoBarraOpcao.appendChild(BarraSelect);
        });

        console.log('Opções adicionadas (gráfico de barra lateral):', graficoBarraOpcao.options);

    } catch (error) {
        console.error('Erro ao buscar objetos/anos para o gráfico de barra lateral:', error);
    }
///////////////////////////////////////////////////////////////////////////////
try {
    // Chama o backend para o gráfico de barra lateral por mês
    const responseMesBarraLateral = await fetch(`/apiCaue/mesDisponivelBarraLateral`);
    
    // Verifica se a resposta é bem-sucedida
    const dataMesBarraLateral = await responseMesBarraLateral.json();
    console.log('Dados recebidos (gráfico de barra lateral por mês):', dataMesBarraLateral);

    if (dataMesBarraLateral.length === 0) {
        console.error('Nenhum objeto/mês encontrado para o gráfico de barra lateral por mês.');
        return;
    }

    const selectMesBarra = document.getElementById('mesSelect');

    selectMesBarra.innerHTML = '';

    // Adiciona a opção "Média Anual"
    const opcaoMediaAnual = document.createElement('option');
    opcaoMediaAnual.textContent = 'Média Anual';
    opcaoMediaAnual.value = '';
    selectMesBarra.appendChild(opcaoMediaAnual);        


    // Adiciona os meses disponíveis
    dataMesBarraLateral.forEach(item => {
        const mesBarraSelect = document.createElement('option'); // Cria um novo elemento <option> a cada iteração
        switch (item["ano"]) {
            case 1:
                mesBarraSelect.textContent = 'Janeiro';
                break;
            case 2:
                mesBarraSelect.textContent = 'Fevereiro';
                break;
            case 3:
                mesBarraSelect.textContent = 'Março';
                break;
            case 4:
                mesBarraSelect.textContent = 'Abril';
                break;
            case 5:
                mesBarraSelect.textContent = 'Maio';
                break;
            case 6:
                mesBarraSelect.textContent = 'Junho';
                break;
            case 7:
                mesBarraSelect.textContent = 'Julho';
                break;
            case 8:
                mesBarraSelect.textContent = 'Agosto';
                break;
            case 9:
                mesBarraSelect.textContent = 'Setembro';
                break;
            case 10:
                mesBarraSelect.textContent = 'Outubro';
                break;
            case 11:
                mesBarraSelect.textContent = 'Novembro';
                break;
            case 12:
                mesBarraSelect.textContent = 'Dezembro';
                break;
            default:
                mesBarraSelect.textContent = 'Mês Desconhecido';
        }
        mesBarraSelect.value = item["ano"];
        selectMesBarra.appendChild(mesBarraSelect);
    });

    console.log('Opções adicionadas (gráfico de barra lateral por mês):', selectMesBarra.options);

} catch (error) {
    console.error('Erro ao buscar objetos/meses para o gráfico de barra lateral por mês:', error);
}

try {
    // Chama o backend para o gráfico de linha
    const responseGraficoComparacao = await fetch(`/apiCaue/anoDisponivelGraficoLinha`);
    
    // Verifica se a resposta é bem-sucedida
    const dataGraficoComparacao = await responseGraficoComparacao.json();
    console.log('Dados recebidos (gráfico de linha):', dataGraficoComparacao);

    if (dataGraficoComparacao.length === 0) {
        console.error('Nenhum objeto/ano encontrado para o gráfico de linha.');
        return;
    }

    const graficoComparacaoOpcao = document.getElementById('anoSelectComparacao');

    graficoComparacaoOpcao.innerHTML = '';

    dataGraficoComparacao.forEach(item => {
        const ComparacaoSelect = document.createElement('option');
        ComparacaoSelect.textContent = `${item["ano"]}`;
        ComparacaoSelect.value = item["ano"];
        graficoComparacaoOpcao.appendChild(ComparacaoSelect);
    });

    console.log('Opções adicionadas (gráfico de linha):', graficoComparacaoOpcao.options);

} catch (error) {
    console.error('Erro ao buscar objetos/anos para o gráfico de linha:', error);
}

}

// Chama a função fetchAnos para carregar os dados ao inicializar a página
fetchAnos();
