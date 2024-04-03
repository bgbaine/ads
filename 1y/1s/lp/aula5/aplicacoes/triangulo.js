// Lê os três lados de um triangulo e verifica se eles podem formar ou não um triangulo. Caso seja possível, exibe o tipo do triângulo. 

const prompt = require("prompt-sync")()

const a = Number(prompt("Lado A: "))
const b = Number(prompt("Lado B: "))
const c = Number(prompt("Lado C: "))

if (a > (b + c) || b > (a + c) || c > (a + b)) {
    console.log(`Lados não podem formar um triângulo`)
} else {
    console.log(`Lados podem formar um triângulo`)

    if (a == b && a == c) {
        console.log(`Tipo: Equilátero`)
    } else if (a == b || a == c || b == c) {
        console.log(`Tipo: Isósceles`)
    } else {
        console.log(`Tipo: Escaleno`)
    }
}
