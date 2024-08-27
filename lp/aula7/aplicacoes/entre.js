// Lê dois números e exibe os números entre eles, incluindo-os

const prompt = require("prompt-sync")()

const numero1 = Number(prompt("1º Número: "))
const numero2 = Number(prompt("2º Número: "))

console.log(`Entre ${numero1} e ${numero2}:`)

for (let i = numero1; i <= numero2; i++) {
    console.log(i)
}
