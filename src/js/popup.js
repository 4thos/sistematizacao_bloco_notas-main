// Classe Temporizador
class Temporizador {
    constructor(tempoTrabalho, tempoPausa) {
        this.tempoTrabalho = tempoTrabalho;
        this.tempoPausa = tempoPausa;
        this.status = 'parado'; // Status inicial
    }

    iniciar() {
        console.log('Temporizador iniciado.');
        this.status = 'iniciado';
        // Lógica para iniciar o temporizador
    }

    parar() {
        console.log('Temporizador parado.');
        this.status = 'parado';
        // Lógica para parar o temporizador
    }

    notificarFim() {
        console.log('Fim do ciclo Pomodoro.');
        alert('Ciclo de trabalho/pause finalizado!');
    }
}

// Classe Sincronizador
class Sincronizador {
    constructor() {
        this.dadosTarefas = [];
        this.dadosTemporizador = null;
        this.dadosLembretes = [];
    }

    sincronizarDados() {
        // Lógica para sincronizar dados com o armazenamento ou outro dispositivo
        console.log('Dados sincronizados.');
    }
}

// Classe Tarefa
class Tarefa {
    constructor(descricao, status) {
        this.descricao = descricao;
        this.status = status;
    }

    adicionarTarefa(tarefas, descricao) {
        tarefas.push(new Tarefa(descricao, 'pendente'));
        alert('Tarefa adicionada com sucesso');
        console.log('Tarefa adicionada.');
    }

    carregarTarefas() {
        const tarefasSalvas = localStorage.getItem('tarefas');
        if (tarefasSalvas) {
            return JSON.parse(tarefasSalvas);
        }
        return [];
    }

    editarTarefa(tarefas, index, novaDescricao) {
        if (tarefas[index]) {
            tarefas[index].descricao = novaDescricao;
            console.log('Tarefa editada.');
        }
    }

    removerTarefa(tarefas, index) {
        if (tarefas[index]) {
            tarefas.splice(index, 1);
            console.log('Tarefa removida.');
        }
    }

    listarTarefas(tarefas) {
        return tarefas.map((tarefa, index) => `${index + 1}. ${tarefa.descricao} - ${tarefa.status}`);
    }
}

// Classe Lembrete
class Lembrete {
    constructor(hora, descricao) {
        this.hora = hora;
        this.descricao = descricao;
    }

    configurarLembrete(lembretes, hora, descricao) {
        lembretes.push(new Lembrete(hora, descricao));
        console.log('Lembrete configurado.');
    }

    carregarLembretes() {
        const lembretesSalvos = localStorage.getItem('lembretes');
        if (lembretesSalvos) {
            return JSON.parse(lembretesSalvos);
        }
        return [];
    }

    verificarLembretes(lembretes) {
        const horaAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formato HH:MM
        lembretes.forEach(lembrete => {
            if (lembrete.hora === horaAtual) {
                this.enviarNotificacao(lembrete.descricao);
            }
        });
    }

    enviarNotificacao(descricao) {
        console.log('Notificação enviada.');
        alert(`Lembrete: ${descricao}`);
    }
}

// Classe Exportador
class Exportador {
    constructor(formato) {
        this.formato = formato;
    }

    exportarTarefas(tarefas) {
        if (this.formato === 'txt') {
            const tarefasTexto = tarefas.map(tarefa => tarefa.descricao).join('\n');
            console.log('Tarefas exportadas em formato TXT.');
            // Lógica para exportar como arquivo de texto
        }
    }
}

// Código que manipula a lógica do DOM e interação do usuário
document.addEventListener('DOMContentLoaded', function () {
    const temporizador = new Temporizador(25, 5); // Temporizador Pomodoro (25 minutos trabalho, 5 minutos pausa)
    const sincronizador = new Sincronizador();
    const tarefaManager = new Tarefa();
    const lembreteManager = new Lembrete();

    // Carregar as tarefas e lembretes do localStorage
    let tarefas = tarefaManager.carregarTarefas();
    let lembretes = lembreteManager.carregarLembretes();

    // Função para renderizar as tarefas na lista
    function renderizarTarefas() {
        const listaTarefas = document.getElementById('lista-tarefas');
        listaTarefas.innerHTML = ''; // Limpa a lista antes de renderizar novamente

        tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.textContent = tarefa.descricao;

            // Botão de editar tarefa
            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';
            botaoEditar.addEventListener('click', () => {
                const novaDescricao = prompt('Edite a tarefa:', tarefa.descricao);
                if (novaDescricao) {
                    tarefaManager.editarTarefa(tarefas, index, novaDescricao);
                    localStorage.setItem('tarefas', JSON.stringify(tarefas));
                    renderizarTarefas();
                }
            });

            // Botão de remover tarefa
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.addEventListener('click', () => {
                if (confirm('Deseja remover esta tarefa?')) {
                    tarefaManager.removerTarefa(tarefas, index);
                    localStorage.setItem('tarefas', JSON.stringify(tarefas));
                    renderizarTarefas();
                }
            });

            // Adiciona os botões de editar e remover ao item da lista
            li.appendChild(botaoEditar);
            li.appendChild(botaoRemover);
            listaTarefas.appendChild(li);
        });
    }

    // Renderiza as tarefas ao carregar a página
    renderizarTarefas();

    // Adicionar nova tarefa
    document.getElementById('adicionar-tarefa').addEventListener('click', function () {
        const descricao = document.getElementById('nova-tarefa').value;
        if (descricao.trim() !== "") {
            tarefaManager.adicionarTarefa(tarefas, descricao);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas(); // Atualiza a lista após adicionar
            document.getElementById('nova-tarefa').value = ''; // Limpa o campo
						document.getElementById('nova-tarefa').focus();
        }
    });

    // Temporizador
    document.getElementById('iniciar-temporizador').addEventListener('click', function () {
        temporizador.iniciar();
    });
    document.getElementById('parar-temporizador').addEventListener('click', function () {
        temporizador.parar();
    });

    // Sincronizar dados
    document.getElementById('sincronizar-dados').addEventListener('click', function () {
        sincronizador.sincronizarDados();
    });

    // Configurar Lembrete usando campos de entrada
    document.getElementById('configurar-lembrete').addEventListener('click', function () {
        const descricao = document.getElementById('nova-lembrete').value;
        const hora = document.getElementById('hora-lembrete').value;
        if (descricao.trim() !== "" && hora.trim() !== "") {
            lembreteManager.configurarLembrete(lembretes, hora, descricao);
            localStorage.setItem('lembretes', JSON.stringify(lembretes)); // Salvar os lembretes no localStorage
            console.log('Lembretes salvos no localStorage');
						document.getElementById('nova-lembrete').value = '';
						document.getElementById('hora-lembrete').value = '';
						document.getElementById('nova-lembrete').focus();
        }
    });

    // Exportar Tarefas
    document.getElementById('exportar-tarefas').addEventListener('click', function () {
        const exportador = new Exportador('txt'); // Exportando em formato TXT
        exportador.exportarTarefas(tarefas);
    });

    // Verifica lembretes a cada minuto
    setInterval(() => {
        lembreteManager.verificarLembretes(lembretes);
    }, 60000); // Verifica a cada 60 segundos
});
