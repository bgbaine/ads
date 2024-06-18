// Lê um número e exiba uma mensagem indicando se ele é par ou ímpar.

const prompt = require("prompt-sync")();

const numero = Number(prompt("Número: "));

if (numero % 2) {
    console.log("%i é ímpar.", numero)
} else {
    console.log("%i é par.", numero)
}
