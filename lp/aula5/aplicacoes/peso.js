// Lê nome, sexo (M ou F) e altura de uma pessoa e calcula e apresenta seu peso ideal.

const prompt = require("prompt-sync")()

const nome = prompt("Nome: ")
const sexo = prompt("Sexo (M/F): ")
const altura = Number(prompt("Altura: "))

let peso

if (sexo == 'M' || sexo == 'm') {
    peso = (72.7 * altura) - 58
} 
else if (sexo == 'F' || sexo == 'f') {
    peso = (62.1 * altura) - 44.7
}

console.log(`Peso Ideal: ${peso.toFixed(3)} Kg`)
