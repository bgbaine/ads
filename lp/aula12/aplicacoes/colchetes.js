// Lê um número e preenche um espaço conforme o número informado

const prompt = require("prompt-sync")();

const numero = Math.floor(Number(prompt("Número: ")) / 2);
const colchetesEsquerda = "[".repeat(numero);
const colchetesEsquerda = "]".repeat(numero);

if (numero % 2) {
	console.log(colchetesEsquerda + "*" + colchetesDireita);
} else {
	console.log(colchetesEsquerda + colchetesDireita)
	
