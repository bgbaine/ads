// Lê dois valores e exibe se são múltiplos ou não.

const prompt = require("prompt-sync")();


const numero1 = Number(prompt("1º Número: "));
const numero2 = Number(prompt("2º Número: "));

if (numero1 % numero2 == 0 || numero2 % numero1 == 0) {
    console.log("São múltiplos");
} else {
    console.log("Não são múltiplos");
}
