// Lê três números e calcule a média aritmética desses números.

const prompt = require("prompt-sync")();


const numero1 = Number(prompt("1º Número: "));
const numero2 = Number(prompt("2º Número: "));
const numero3 = Number(prompt("3º Número: "));

console.log("A média aritmética dos números informados é ", (numero1 + numero2 + numero3) / 3);
