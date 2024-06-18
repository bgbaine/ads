// Lê três números (diferentes) e exibe a soma dos 2 maiores.

const prompt = require("prompt-sync")();


const numero1 = Number(prompt("1º Número: "));
const numero2 = Number(prompt("2º Número: "));
const numero3 = Number(prompt("3º Número: "));

let soma = 0;

if (numero1 > numero2 || numero1 > numero3) {
    soma += numero1;
}

if (numero2 > numero1 || numero2 > numero3) {
    soma += numero2;
}

if (numero3 > numero1 || numero3 > numero1) {
    soma += numero3;
}

console.log("Soma dos 2 maiores é: %i", soma)
