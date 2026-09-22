const tarefas = [];
let proximoID = 1;

const tarefa = document.getElementById('input');
const inputBtn = document.getElementById('input-btn');
const msg = document.getElementById('msg');
const listaTarefas = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');


const render = (tarefas) => {
    console.log(tarefas);
    listaTarefas.innerHTML = tarefas.map(t =>
        `<li class="tarefa" id="${t.id}">
            <label>
                ${t.texto}&nbsp;
                <input class="checkbox" type="checkbox" name="checkbox" value="concluida">
            </label>
            <button class="apagar-btn">✖</button>
        </li>
       `
    ).join('');
}

const atualizarContador = () => {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const txt = `${total} de ${concluidas} concluídas`;
    contador.textContent = total > 0 ? txt : '';
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
    render(tarefas);
    atualizarContador();
    
});


listaTarefas.addEventListener('click', (e) => {
    if (e.target.classList.contains('apagar-btn')) {
        const li = e.target.closest('li');
        const id = Number(li.id)

        const index = tarefas.findIndex(t => t.id === id);
        tarefas.splice(index, 1);
        render(tarefas);
        atualizarContador();
    }

    if(e.target.classList.contains('checkbox')){
        const li = e.target.closest('li');
        const id = Number(li.id);

        const index = tarefas.findIndex(t => t.id === id)
        tarefas[index].concluida = !tarefas[index].concluida;
        atualizarContador();
    }
});


