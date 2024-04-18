// Lê um número e até quanto contar e exibe sua tabuada conforme desejado

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))
const final = Number(prompt("Tabuada até Quanto: "))

console.log(`\nTabuada do ${numero}`)
console.log("-------------------------------")

for (let i = 1; i <= final; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`)
}
