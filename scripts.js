
let tarefas = []

const input = document.getElementById("tarefa_input")
const listaUrgente = document.getElementById("lista_urgente")
const listaMedia = document.getElementById("lista_media")
const listaBaixa = document.getElementById("lista_baixa")
const modal = document.getElementById("modal")
const abrirModal = document.getElementById("abrirModal")
const botoesPrioridade = document.querySelectorAll("[data-prioridade]")
const addIcon = document.getElementById("icon")


function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function carregarTarefa(){
    const tarefasSalvas = localStorage.getItem("tarefas")

    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas)
    }
}

//modal para escolher prioridade

abrirModal.addEventListener("click", function(){
    if (input.value ==="") return

    modal.style.display = "flex"
})

botoesPrioridade.forEach(function(botao){
    botao.addEventListener("click", function(){
        const prioridade = botao.dataset.prioridade

        tarefas.push({
            texto: input.value,
            prioridade: prioridade,
            concluida: false
        })

        salvarTarefas()
        mostrarTarefa()
        input.value = ""

        modal.style.display = "none"
    })

})

//mostra as tarefas salvas cria o botão de apagalas

function mostrarTarefa(){

    listaUrgente.innerHTML = ""
    listaMedia.innerHTML = ""
    listaBaixa.innerHTML = ""

    tarefas.forEach(function(tarefa, index){

        const li = document.createElement("li")

        li.textContent = tarefa.texto

        const botaoExcluir = document.createElement("button")
        botaoExcluir.innerHTML = `<img src="imagens/delete.svg" class="icone-excluir">`
        botaoExcluir.classList.add("delete-btn")

        botaoExcluir.addEventListener("click", function(){

            tarefas.splice(index,1)

            salvarTarefas()
            mostrarTarefa()

        })

        li.appendChild(botaoExcluir)

        if(tarefa.prioridade === "urgente"){
            listaUrgente.appendChild(li)
        }
        else if(tarefa.prioridade === "media"){
            listaMedia.appendChild(li)
        }
        else if(tarefa.prioridade === "baixa"){
            listaBaixa.appendChild(li)
        }

    })

}

//tentativa de colocar um icon no input que desaparece quando se digita, mas nao funciona dps q salva a tarefa

input.addEventListener("input", function(){

    if(input.value.trim() !== ""){
        addIcon.style.display = "none"
    } else {
        addIcon.style.display = "block"
    }
})

carregarTarefa()
mostrarTarefa()