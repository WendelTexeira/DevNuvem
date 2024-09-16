const alerta = document.querySelector('.alerta');

// Ação do button Cadastrar
const btnCadastrar = document.querySelector('#btnCadastrar');
btnCadastrar.addEventListener('click', handleCadastrar);

// Ação do button Limpar
const btnLimpar = document.querySelector('#btnLimpar');
btnLimpar.style.display = 'none';

function receberDados() {
    const titulo = document.querySelector('#titulo');
    const descricao = document.querySelector('#descricao');
    alerta.classList.remove('sucesso');

    // Verifica se foi preenchido o título
    if (!validarDados(titulo.value)) {
        titulo.focus();
        alerta.innerHTML = 'Preencha o campo título';
        return false;
    }

    // Verifica se foi preenchido a descrição
    if (!validarDados(descricao.value)) {
        descricao.focus();
        alerta.innerHTML = 'Preencha o campo descrição';
        return false;
    }

    // Adiciona o objeto no array
    listaTarefas = {
        titulo: titulo.value,
        descricao: descricao.value,
    };

    return true;
}

function validarDados(campo) {
    return campo !== '' ? true : false;
}

/* GET */
function listarTarefas() {
    fetch('http://localhost:3000/api/task', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(tarefas => {
            const tarefasCadastradas = document.querySelector('#tarefas');
            tarefasCadastradas.innerHTML = '';

            tarefas.forEach(tarefa => {
                const id = tarefa.id || tarefa.objectId; // Verifique se a propriedade é 'id' ou 'objectId'
                const titulo = tarefa.title;
                const descricao = tarefa.description;
            
                const cardTarefa = document.createElement('div');
                cardTarefa.classList.add('card-tarefa');
                tarefasCadastradas.appendChild(cardTarefa);
            
                const cardTitulo = document.createElement('div');
                cardTitulo.innerHTML = titulo;
            
                const cardDescricao = document.createElement('div');
                cardDescricao.innerHTML = descricao;
            
                const btnEditar = document.createElement('button');
                btnEditar.setAttribute('class', 'btn-editar');
                btnEditar.setAttribute('id', id); // Verifique se o ID está correto aqui
                btnEditar.addEventListener('click', () => {
                    editarTarefa(id); // Aqui também, passar o ID correto para a função
                });
            
                const btnExcluir = document.createElement('button');
                btnExcluir.setAttribute('class', 'btn-excluir');
                btnExcluir.setAttribute('id', id); // Verifique se o ID está correto aqui
                btnExcluir.addEventListener('click', function () {
                    excluirTarefa(id); // Aqui também, passar o ID correto para a função
                });

                btnEditar.addEventListener('click', () => {
                    console.log('Editar ID:', id); // Verifique se o ID está correto aqui
                    editarTarefa(id);
                });
                
                btnExcluir.addEventListener('click', () => {
                    console.log('Excluir ID:', id); // Verifique se o ID está correto aqui
                    excluirTarefa(id);
                });
            
                cardTarefa.appendChild(cardTitulo);
                cardTarefa.appendChild(cardDescricao);
                cardTarefa.appendChild(btnEditar);
                cardTarefa.appendChild(btnExcluir);
            });
            
        })
        .catch(error => console.error('Erro ao listar tarefas:', error));
}

/* POST */
function cadastrarTarefa() {
    const titulo = listaTarefas.titulo;
    const descricao = listaTarefas.descricao;

    fetch('http://localhost:3000/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: titulo,
            description: descricao
        }),
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
    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;

    fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: titulo,
            description: descricao
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar a tarefa');
        }
        return response.json();
    })
    .then(data => {
        alerta.classList.add('sucesso');
        alerta.innerHTML = 'Tarefa atualizada';
        listarTarefas();
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
}


/* DELETE */
function excluirTarefa(id) {
    fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        listarTarefas();
    })
    .catch(error => console.error('Erro ao excluir tarefa:', error));
}


/* GET by id */
function editarTarefa(id) {
    fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(tarefa => {
            document.querySelector('#titulo').value = tarefa.title;
            document.querySelector('#descricao').value = tarefa.description;

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

// Listar tarefas ao carregar a página
listarTarefas();
