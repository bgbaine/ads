// Lê um número e um nome e exibe o nome entre '*', onde o número indica a quantidade de '*' antes e depois do nome

const prompt = require("prompt-sync")()


const nome = prompt("Nome: ")
const numero = Number(prompt("Número: "))

console.log(`${"*".repeat(numero)} ${nome} ${"*".repeat(numero)}`)
