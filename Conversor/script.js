const conversor = document.querySelector(".convert-buttom")
const selecionarconversor = document.querySelector(".selecionador")


function conveter(){
    const valorinput = document.querySelector(".input-currency").value
    const valorparaconveter = document.querySelector(".valor-moeda")  // Valor para converter
    const valorparaseconveter = document.querySelector(".valor-moeda-convertido") // Valor convertido

    const dolartoday = 5.2
    const eurotoday = 6.2

    if(selecionarconversor.value == "dolarvalor"){
            valorparaseconveter.innerHTML = new Intl.NumberFormat("en-US",{
            style:"currency",
            currency: "USD"
    }).format(valorinput / dolartoday)  // Codigo para formatar os valores

    }
    if(selecionarconversor.value == "eurovalor"){
            valorparaseconveter.innerHTML = new Intl.NumberFormat("de-DE", {
                style:"currency",
                currency:"EUR"
            }).format(valorinput/eurotoday)
    }


    valorparaconveter.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valorinput)



}

function changecurrency(){
    const nomedovalor = document.getElementById("dolar-americano")
    const trocaimg = document.querySelector(".bandeira-americana")


    if(selecionarconversor.value == "dolarvalor"){
        nomedovalor.innerHTML = "Dolár Americano"
        trocaimg.src = "./assets/dollar.png"
    }

        if(selecionarconversor.value == "eurovalor"){
        nomedovalor.innerHTML = "Euro"
        trocaimg.src = "./assets/euro.png"
    }
    conveter()
}



selecionarconversor.addEventListener("change", changecurrency )
conversor.addEventListener("click", conveter)