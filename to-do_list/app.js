
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
            <label>
                ${t.texto}&nbsp;
                <input class="checkbox" type="checkbox" ${t.concluida ? "checked" : ''}>
            </label>
            <button class="apagar-btn">✖</button>
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

    const novaTarefa = { id: proximoID++, texto: input, concluida: false };
    tarefas.push(novaTarefa);
    tarefa.value = '';
    tarefa.focus();
    msg.textContent = ''
    atualizarTudo();

});


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
    } else {
        return
    }

    atualizarTudo();
});


