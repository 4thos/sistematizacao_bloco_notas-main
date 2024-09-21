
# Documentação Técnica - Bloco de Notas Integrado

## Arquitetura do Sistema

A extensão foi desenvolvida utilizando as seguintes tecnologias e componentes:

- **Frontend:**
  - HTML5, CSS3, e JavaScript puro para a interface com o usuário.
  - Os componentes visuais do popup da extensão foram estilizados com CSS, proporcionando uma interface responsiva e amigável.

- **Backend (scripts da extensão):**
  - **Content Scripts:** Responsáveis pela interação com a página ativa do usuário. O script é injetado dinamicamente e interage diretamente com o DOM da página.
  - **Background Scripts:** Gerenciam ações contínuas, como o armazenamento de dados (tarefas, lembretes, etc.) no localStorage e a comunicação com as APIs do Chrome.
  - **APIs do Chrome:** Utilizamos as APIs `chrome.storage` para persistir os dados e `chrome.scripting` para injetar scripts nas páginas ativas.

## Estrutura de Dados

Os dados são armazenados no navegador utilizando a API `localStorage`. Abaixo está a estrutura dos dados gerenciados pela extensão:

- **Tarefas:**
  ```json
  [
    {
      "descricao": "Tarefa para estudo de geologia",
      "status": "pendente"
    },
    {
      "descricao": "Fazer revisão do código PHP",
      "status": "concluída"
    }
  ]
  ```

- **Lembretes:**
  ```json
  [
    {
      "hora": "08:00",
      "descricao": "Ler livros"
    },
    {
      "hora": "14:00",
      "descricao": "Reunião com o time"
    }
  ]
  ```

## Diagrama UML

O diagrama de classes UML abaixo representa a modelagem da aplicação:

```
+-------------------+         1..*         +---------------------+
|  Temporizador     |--------------------->|     Sincronizador   |
+-------------------+                      +---------------------+
| - tempoTrabalho   |                      | - dadosTarefas:     |
| - tempoPausa      |                      |   Lista<Tarefa>     |
| - status          |                      | - dadosTemporizador |
+-------------------+                      | - dadosLembretes:   |
| + iniciar()       |                      |   Lista<Lembrete>   |
| + parar()         |                      +---------------------+
| + notificarFim()  |                      | + sincronizarDados()|
+-------------------+                      +---------------------+
                                                   ^
                                                   |
                                                   |
                                           +--------------------+
                                           |     Tarefa         |
                                           +--------------------+
                                           | - descricao        |
                                           | - status           |
                                           +--------------------+
                                           | + adicionarTarefa()|
                                           | + editarTarefa()   |
                                           | + removerTarefa()  |
                                           | + listarTarefas()  |
                                           +--------------------+
                                                   ^
                                                   |
                                           +-----------------------+
                                           |     Lembrete          |
                                           +-----------------------+
                                           | - hora                |
                                           | - descricao           |
                                           +-----------------------+
                                           | + configurarLembrete()|
                                           | + enviarNotificacao() |
                                           +-----------------------+
                                                   ^
                                                   |
                                                   |
                                           +--------------------+
                                           |    Exportador      |
                                           +--------------------+
                                           | - formato: string  |
                                           +--------------------+
                                           | + exportarTarefas()|
                                           +--------------------+
```

## APIs Utilizadas

1. **chrome.storage API:**
   Utilizada para salvar dados de tarefas, lembretes e configurações do temporizador no navegador.

2. **chrome.scripting API:**
   Utilizada para injetar content scripts nas páginas ativas e gerenciar a interação com o DOM da página.

## Repositório GitHub

A documentação técnica está disponível em formato **Markdown** no repositório do GitHub, na raiz do projeto no arquivo **README.md**. A estrutura de diretórios está organizada da seguinte forma:

```
bloco_de_notas_integrado_extensao/
├── src/
│   ├── css/
│   ├── js/
│   ├── icons/
│   └── popup.html
├── manifest.json
└── README.md
```