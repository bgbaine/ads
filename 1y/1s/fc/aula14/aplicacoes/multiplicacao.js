// Lê três números (diferentes) e exibe a multiplicação dos 2 menores.

const prompt = require("prompt-sync")();


let menor1 = Number(prompt("1º Número: "));
let menor2 = Number(prompt("2º Número: "));
const numero3 = Number(prompt("3º Número: "));
const numero4 = Number(prompt("4º Número: "));

if (menor1 > numero3) {
    menor1 = numero3;
}

if (menor1 > numero4) {
    menor1 = numero4;
}

if (menor2 > numero3) {
    menor2 = numero3;
}

if (menor2 > numero4) {
    menor2 = numero4;
}

console.log("A multiplicação dos 2 menores é: %i", menor1 * menor2)
