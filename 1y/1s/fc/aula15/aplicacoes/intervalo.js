// Lê um número e verifica se este está dentro de um determinado intervalo.

const prompt = require("prompt-sync")();


const numero = Number(prompt("Número: "));

if ((numero > 5 && numero < 10) || numero <= 2 || numero >= 20) {
    console.log("O número está dentro do intervalo determinado");
} else {
    console.log("O número não está dentro do intervalo determinado");
}

if ((numero <= 5 || numero >= 10) && numero > 2 && numero < 20) {
    console.log("O número não está dentro do intervalo determinado");
} else {
    console.log("O número está dentro do intervalo determinado");
}
