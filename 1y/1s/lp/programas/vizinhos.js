// Lê um número e exibe seus vizinhos (anterior e posterior).

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))

console.log(`O número ${numero - 1} antecede o número ${numero}, enquanto ${numero + 1} o sucede`)
