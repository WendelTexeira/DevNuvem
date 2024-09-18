const alerta = document.querySelector('.alerta');

// Ação do botão Cadastrar
const btnCadastrar = document.querySelector('#btnCadastrar');
btnCadastrar.addEventListener('click', handleCadastrar);

// Ação do botão Limpar
const btnLimpar = document.querySelector('#btnLimpar');
btnLimpar.style.display = 'none';

// Variável para armazenar os dados da tarefa
let dadosTarefa = {};

// Função para receber dados do formulário
function receberDados() {
    const nome = document.querySelector('#titulo');
    const descricao = document.querySelector('#descricao');
    alerta.classList.remove('sucesso');

    // Verifica se foi preenchido o título
    if (!validarDados(nome.value)) {
        nome.focus();
        alerta.innerHTML = 'Preencha o campo título';
        return false;
    }

    // Verifica se foi preenchida a descrição
    if (!validarDados(descricao.value)) {
        descricao.focus();
        alerta.innerHTML = 'Preencha o campo descrição';
        return false;
    }

    // Armazena os dados da tarefa
    dadosTarefa = {
        nome: nome.value,
        descricao: descricao.value,
    };

    return true;
}

// Função para validar os dados
function validarDados(campo) {
    return campo !== '' ? true : false;
}

/* GET */
function listarTarefas() {
    fetch('https://backtaskhive1-vqh14r8m.b4a.run/api/task', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta da API:', data);

        const tarefasCadastradas = document.querySelector('#tarefas');
        tarefasCadastradas.innerHTML = '';

        if (Array.isArray(data)) {
            data.forEach(tarefa => {
                const id = tarefa.id;
                const titulo = tarefa.nome;
                const descricao = tarefa.descricao;

                const cardTarefa = document.createElement('div');
                cardTarefa.classList.add('card-tarefa');
                tarefasCadastradas.appendChild(cardTarefa);

                const cardTitulo = document.createElement('div');
                cardTitulo.innerHTML = titulo;

                const cardDescricao = document.createElement('div');
                cardDescricao.innerHTML = descricao;

                const btnEditar = document.createElement('button');
                btnEditar.setAttribute('class', 'btn-editar');
                btnEditar.setAttribute('id', id);
                btnEditar.addEventListener('click', () => {
                    editarTarefa(id);
                });

                const btnExcluir = document.createElement('button');
                btnExcluir.setAttribute('class', 'btn-excluir');
                btnExcluir.setAttribute('id', id);
                btnExcluir.addEventListener('click', function () {
                    excluirTarefa(id);
                });

                cardTarefa.appendChild(cardTitulo);
                cardTarefa.appendChild(cardDescricao);
                cardTarefa.appendChild(btnEditar);
                cardTarefa.appendChild(btnExcluir);
            });
        } else {
            console.error('A resposta não é um array como esperado. Estrutura atual:', data);
        }
    })
    .catch(error => console.error('Erro ao listar tarefas:', error));
}

/* POST */
function cadastrarTarefa() {
    if (!dadosTarefa.nome || !dadosTarefa.descricao) {
        console.error('Dados da tarefa inválidos.');
        return;
    }

    fetch('https://backtaskhive1-vqh14r8m.b4a.run/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosTarefa),
    })
        .then(response => response.json())
        .then(data => {
            alerta.classList.add('sucesso');
            alerta.innerHTML = 'Tarefa cadastrada';
            listarTarefas();
            btnLimpar.click();
        })
        .catch(error => console.error('Erro ao cadastrar tarefa:', error));
}

/* PUT */
function atualizarTarefa(id) {
    const nome = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;

    console.log('Atualizando tarefa:', {
        id: id,
        nome: nome,
        descricao: descricao
    });

    fetch(`https://backtaskhive1-vqh14r8m.b4a.run/api/task/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            descricao: descricao
        }),
    })
    .then(response => response.json())
    .then(data => {
        alerta.classList.add('sucesso');
        alerta.innerHTML = 'Tarefa atualizada';
        listarTarefas();
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

/* DELETE */
function excluirTarefa(id) {
    if (!id) {
        console.error('ID não fornecido para excluir a tarefa.');
        return;
    }

    fetch(`https://backtaskhive1-vqh14r8m.b4a.run/api/task/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }

        if (response.headers.get('content-length') > 0) {
            return response.json();
        } else {
            return {};
        }
    })
    .then(data => {
        console.log('Resposta da API ao excluir:', data);
        listarTarefas();
    })
    .catch(error => console.error('Erro ao excluir tarefa:', error));
}

/* GET by id */
function editarTarefa(id) {
    if (!id) {
        console.error('ID não fornecido para editar a tarefa.');
        return;
    }

    fetch(`https://backtaskhive1-vqh14r8m.b4a.run/api/task/${id}`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }
        return response.json();
    })
    .then(tarefa => {
        if (tarefa) {
            document.querySelector('#titulo').value = tarefa.nome;
            document.querySelector('#descricao').value = tarefa.descricao;

            btnCadastrar.innerHTML = 'Atualizar';

            btnCadastrar.removeEventListener('click', handleCadastrar);
            btnCadastrar.addEventListener('click', function handleAtualizar(evento) {
                evento.preventDefault();

                if (!receberDados()) {
                    return;
                }

                atualizarTarefa(id);

                btnCadastrar.innerHTML = 'Cadastrar';
                btnCadastrar.removeEventListener('click', handleAtualizar);
                btnCadastrar.addEventListener('click', handleCadastrar);

                btnLimpar.click();
            });
        } else {
            console.error('Tarefa não encontrada.');
        }
    })
    .catch(error => console.error('Erro ao buscar tarefa:', error));
}

/* Handle cadastrar */
function handleCadastrar(evento) {
    evento.preventDefault();

    if (!receberDados()) {
        return;
    }

    cadastrarTarefa();
    removerAlerta(alerta, 2500);
}

function removerAlerta(elemento, tempo) {
    setTimeout(() => {
        elemento.innerHTML = '';
    }, tempo);
}

listarTarefas();
