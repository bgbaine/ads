// Lê um ano e exibe se esse ano é bissexto ou não

const prompt = require("prompt-sync")();


const ano = Number(prompt("Digite um ano: "));

if ((ano % 4 == 0 && ano % 100 == 1) || ano % 400 == 0) {
    console.log("O ano informado é bissexto");
} else {
    console.log("O ano informado não é bissexto");
}
