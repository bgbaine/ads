// Lê um número e exibe os múltiplos de cinco até ele, exibindo mensagem caso o número seja inferior à 5

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))

if (numero < 5) {
    console.log("Ops... Número deve ser maior ou igual a 5")
}

for (let i = 5; i <= numero; i = i + 5) {
    console.log(i)
}
