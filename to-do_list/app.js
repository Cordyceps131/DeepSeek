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



