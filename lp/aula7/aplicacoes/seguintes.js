// Lê um número e mostra os dez números seguintes a ele

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))

console.log(`Seguintes ao ${numero}:`)
for (let i = 1; i < 11; i++) {
    console.log(numero + i)
}
