// Lê duas notas, calcula e mostra a média das mesmas.

const prompt = require("prompt-sync")()

const nota1 = Number(prompt("Nota 1: "))
const nota2 = Number(prompt("Nota 2: "))
console.log(`A média das notas é ${((nota1 + nota2) / 2).toFixed(2)}`)
