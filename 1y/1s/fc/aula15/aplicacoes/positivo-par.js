// Lê três números inteiros e exibe se pelo menos um é positivo e par.

const prompt = require("prompt-sync")();


const numeros = [];
let achado = false;

while (numeros.length < 3) {
    numeros.push(Math.floor(Number(prompt("Número: "))));
}

for (let i in numeros) {
    /* if (numeros[i] > 0 && numeros[i] % 2 == 0) {
        achado = true;
        break;
    } else {
        continue;
    } */
    if (numeros[i] < 0 || numeros[i] % 2 != 0) {
        continue;
    } else {
        achado = true;
        break;
    }
}

if (achado) {
    console.log("Pelo menos um é positivo e par");
} else {
    console.log("Nenhum é positivo ou par");
}
