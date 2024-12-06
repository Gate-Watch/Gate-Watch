async function fetchCount() {
  try {
      const response = await fetch('/apiCaue/quantidadetotens'); // Chamada à rota no backend
      const data = await response.json();
      document.getElementById('quantidadeTotens').textContent = `${data[0]["count"]}`; // Atualiza o conteúdo do elemento
  } catch (error) {
      console.error('Erro ao buscar o count:', error);
      document.getElementById('quantidadeTotens').textContent = 'Erro ao carregar';
  }
}

// Chamar a função ao carregar a página
fetchCount();