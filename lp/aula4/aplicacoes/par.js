// Lê um número e mostra o par seguinte à este número.

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))

if ((numero % 2) == 0) {
    console.log(`Par Seguinte: ${numero + 2}`)
} else {
    console.log(`Par Seguinte: ${numero + 1}`)
}
