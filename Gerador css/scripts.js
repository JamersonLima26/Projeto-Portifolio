/*
Variável - Pedacinho da memória que guarda o que eu quiser

Função - PEDAÇO de código que só executa quando é chamado
Algoritmo - Receita de bolo
Logica de programação - Fazer o bolo

// Algoritmo do nosso sistema
// Logica de programação

[x] Saber quem é o botão
[x] Saber quando o botão foi clicado
[x] Saber quem é a textarea
[x] Pegar o que tem dentro dele
[x] Enviar para a IA
[x] Pegar a resposta da IA e colocar na tela

// Ir ao HTML e pegar o botão
// HTML = document (documento)
// Selecionar (querySelec)
// Quem? O Botão
// Dar apelido para o botao - classes(class) =. 
// vizinho curioso ( addeventlistener)
//adiciona ouvite de eventos
//Evento = click,digitar...
//Fetch - ferramenta JC para se comunicar com o servidor


*/

// Descobri que é o botao
let botao = document.querySelector(".botao-gerar")

let chave = "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"

let endereco = "https://api.groq.com/openai/v1/chat/completions"

// Criei a funcao que sera chamada quando clicar no botao
// async / wait(espere)
async function gerarCodigo() {
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")
    let textoUsuario = document.querySelector(".caixa-texto").value

    let resposta = await fetch(endereco,{
        method: "POST",
        headers: {
            "Counter-Type": "application/json",
            "Authorization": "Bearer " + chave
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                role: "system",
                content: "Você é um gerador de codigo HTML e CSS. Responda somente com codigo puro. Nunca use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga exatamente o que o usúario pedir. Se pedir algo quicando, usa translateY no @keyframes. Se pedir algo girando, use rotate.",
             },
             {
                role: "user",
                content: textoUsuario
            
             }
            ]
            

    })
})

let dados = await resposta.json()
let resultado = dados.choices[0].message.content

blocoCodigo.textContent = resultado
resultadoCodigo.srcdoc = resultado


console.log(dados)

}



// Ficar de olho no botao, quando clicar chamar o gerarCodigo
botao.addEventListener("click", gerarCodigo)
