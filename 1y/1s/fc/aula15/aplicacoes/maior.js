// Lê três números e informa qual é o maior dentre os três

const prompt = require("prompt-sync")();


const numero1 = Number(prompt("1º Número: "));
const numero2 = Number(prompt("2º Número: "));
const numero3 = Number(prompt("3º Número: "));

if (numero1 > numero2 && numero1 > numero3) {
    console.log(numero1);
} else if (numero2 > numero1 && numero2 > numero3) {
    console.log(numero2);
} else {
    console.log(numero3);
}
