// 5 funções: adicionarnovatarefa, mostrartarefas, deletartarefa, concluirtarefa, recarregartela

//querySelector - pega o elemento que eu quero

const button = document.querySelector('.button-task')
const input = document.querySelector('.input-task')
const listacompleta = document.querySelector('.list-tasks')

//minha lista vai começar vazia, e são vários elementos
let minhalistadeitens = []

//push - adiciona algo no array

function adicionarnovatarefa() {
    minhalistadeitens.push({  //objeto
        tarefa: input.value,
        concluida: false
    })
    input.value = ''

    mostrartarefas()
}
//forEach - pega item por item e transforma em tarefa

function mostrartarefas() {
    //index - posição dentro do array (da tarefa)
    let novali = ''
    minhalistadeitens.forEach((item, index) => {
        novali = novali +
    //adiciona a classe done se concluirtarefa for verdadeiro
            `
    <li class="task ${item.concluida && "done"}">
    <img src="./img/check.png" alt="check na tarefa" onclick="concluirtarefa(${index})"> 
    <p>${item.tarefa}</p>
    <img src="./img/lixeira.png" alt="tarefa apagada" onclick="deletartarefa(${index})">
    </li>
    `
    })

localStorage.setItem('lista', JSON.stringify(minhalistadeitens)) //local storage: salva informações da pagina | só aceita string, preciso tranformar em objeto

    listacompleta.innerHTML = novali
}
function concluirtarefa(index) {
    minhalistadeitens[index].concluida = !minhalistadeitens[index].concluida //alterando valor para ele mesmo invertido
    mostrartarefas()
}

function deletartarefa(index) {
    minhalistadeitens.splice(index, 1)
    // splice - permite que eu delete o que eu quiser dentro do array so preciso informar (posicao e quantos itens)
    mostrartarefas() //pra atualizar a lista preciso pegar as tarefas de novo

}

function recarregartela(){
const tarefasdoLocalStorage = localStorage.getItem('lista')

if (tarefasdoLocalStorage) {
minhalistadeitens = JSON.parse(tarefasdoLocalStorage)//transformar string em objeto
}

mostrartarefas()
}
recarregartela()
button.addEventListener('click', adicionarnovatarefa)

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        minhalistadeitens.push(input.value)
        mostrartarefas()
    }
  });