if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize(); // O DOM já está carregado
}
function initialize() {
	const botaoAdicionar = document.getElementById('adicionar-tarefa');
	if (botaoAdicionar) {
		botaoAdicionar.addEventListener('click', () => {
			alert('Botão clicado!');
		});
	} else {
		console.log('Botão adicionar tarefa não encontrado.');
	}
}