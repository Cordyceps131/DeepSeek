
const dadosLocalStorage = localStorage.getItem('tarefas');
const tarefas = (dadosLocalStorage && dadosLocalStorage.trim() !== "") ? JSON.parse(dadosLocalStorage) : [];
let proximoID = tarefas.reduce((max, t) => t.id > max ? t.id : max, 0) + 1;

const tarefa = document.getElementById('input');
const inputBtn = document.getElementById('input-btn');
const msg = document.getElementById('msg');
const listaTarefas = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');


const render = (tarefas) => {
    listaTarefas.innerHTML = tarefas.map(t =>
        `<li class="tarefa" id="${t.id}">
            <input class="select" type="checkbox" ${t.selecionada ? "checked" : ''}>
            <label>
                ${t.texto}&nbsp;
                <input class="checkbox" type="checkbox" ${t.concluida ? "checked" : ''}>
            </label>
            <button class="editar" title="Editar Tarefa">✏</button>
            <button class="apagar-btn" title="Apagar Tarefa">✖</button>
        </li>
       `
    ).join('');
}


const atualizarContador = () => {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const txt = `${concluidas} de ${total} concluídas`;
    contador.textContent = total > 0 ? txt : '';
}

const atualizarTudo = () => {
    render(tarefas)
    atualizarContador();
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


if (tarefas.length > 0) {
    render(tarefas);
    atualizarContador();
}


inputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let input = tarefa.value;
    if (!input) {
        msg.textContent = 'Introduz a tarefa que queres adicionar';
        tarefa.focus();
        return;
    }

    const novaTarefa = { id: proximoID++, texto: input, concluida: false, selecionada: false };
    tarefas.push(novaTarefa);
    tarefa.value = '';
    tarefa.focus();
    msg.textContent = ''
    atualizarTudo();

});


const modal = document.getElementById('form');
const formInput = document.getElementById('form-input');
const formBtn = document.getElementById('form-btn');
const formCancelar = document.getElementById('form-cancelar');

let idTarefaEmEdicao = null;

listaTarefas.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) {
        return
    }

    const id = Number(li.id)
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) return; // Garante que a tarefa existe no array

    if (e.target.classList.contains('apagar-btn')) {
        tarefas.splice(index, 1);

    } else if (e.target.closest('label')) {
        e.preventDefault();
        tarefas[index].concluida = !tarefas[index].concluida;

    } else if (e.target.classList.contains('editar')) {
        e.preventDefault();
        idTarefaEmEdicao = id
        formInput.value = tarefas[index].texto
        modal.style.display = '';
        formInput.focus();

    } else if (e.target.classList.contains('select')) {
        tarefas[index].selecionada = !tarefas[index].selecionada;
        selected();
    }
    else {
        return
    }

    atualizarTudo();
});


const selected = () => {
    const selecionadas = tarefas.some(t => t.selecionada)
    if (selecionadas) {
        apagarVarias.style.display = ""
    }
    else {
        apagarVarias.style.display = "none"
    }
}

const selectAll = document.getElementById('select-all');
const apagarVarias = document.getElementById('apagar-varias');
selectAll.addEventListener('click', (e) => {
    if (e.target.checked) {
        tarefas.map(t => t.selecionada = true)
        atualizarTudo();

    }
    else {
        tarefas.map(t => t.selecionada = false)
        atualizarTudo();
    }
    selected();

});


apagarVarias.addEventListener('click', (e) => {
    e.preventDefault();
    const novoArray = tarefas.filter(t => !t.selecionada)
    render(novoArray);
    localStorage.setItem('tarefas', JSON.stringify(novoArray))
})


modal.addEventListener('submit', (e) => {
    e.preventDefault();
    const editInput = formInput.value.trim();
    if (!editInput) {
        return
    };

    const index = tarefas.findIndex(t => t.id === idTarefaEmEdicao)
    if (index !== -1) {
        tarefas[index].texto = editInput;
        modal.style.display = 'none'
        idTarefaEmEdicao = null;
        atualizarTudo();
    }
});

const cancelarEdicao = () => {
    modal.style.display = 'none';
    idTarefaEmEdicao = null;

}

formCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    cancelarEdicao();
})

window.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'none' && e.key === 'Escape') {
        cancelarEdicao();
    }
})
window.addEventListener('click', (e) => {
    if (modal.style.display !== 'none' && !modal.contains(e.target) && !e.target.classList.contains('editar')) {
        cancelarEdicao();
    }
})

