  smileOverlay.style.display = 'none';
  const nomeUsuario = sessionStorage.getItem('NOME_USUARIO');

  if (nomeUsuario) {
    document.getElementById('nome_perfil').textContent = nomeUsuario;
  } else {
    document.getElementById('nome_perfil').textContent = 'Usuário não identificado';
  }

        
      

