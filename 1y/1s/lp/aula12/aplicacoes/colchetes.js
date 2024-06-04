// Lê um número e preenche um espaço conforme o número informado

const prompt = require("prompt-sync")();

const numero = Number(prompt("Número: "));
const colchetes = numero / 2;

if (numero % 2) {
	console.log("[".repeat(colchetes) + "*" + "]".repeat(colchetes));
} else {
	console.log("[".repeat(colchetes) + "]".repeat(colchetes));
}
