// Lê cinco números e lista os números e informa se eles estão em ordem crecente ou não

const prompt = require("prompt-sync")()


const numeros = []

for (let i = 0; i < 5; i++) {
    numero = Number(prompt(`${i + 1}º número: `))

    numeros.push(numero)
}

console.log(`Números Informados: ${numeros}`)

let crescente = true

for (let i = 0; i < 5; i++) {
    if (numeros[i] > numeros[i + 1]) {
        crescente = false
        break
    }
}

if (crescente) {
    console.log("Os números estão em ordem crescente")
} else {
    console.log("Os números não estão em ordem crescente")
}
