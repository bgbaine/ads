// Lê um número e verifica e informa se o número é par ou ímpar.

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))

if ((numero % 2) == 0) {
    console.log(`${numero} é par`)
} else {
    console.log(`${numero} é ímpar`)
}
