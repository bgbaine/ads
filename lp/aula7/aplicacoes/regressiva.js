// Lê um número e exibe uma contagem regressiva

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))

console.log("Contagem Regressiva:")

for (let i = numero; i > -1; i--) {
    if (i != 0) {
        console.log(i)
    } else {
        console.log("Fogo!!")
    }
}
