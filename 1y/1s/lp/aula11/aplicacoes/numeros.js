// Lê 'n' números até ser digitado '0' e exibe quantos foram digitados, sua soma e qual o maior número7

const prompt = require("prompt-sync")()


let numero = contagem = soma = maior = 0

console.log("Informe números ou 0 para sair")
do {
    numero = Number(prompt("Número: "))
    if (numero == 0) {
        break
    }

    soma += numero

    if (numero > maior) {
        maior = numero
    }

    contagem++ 
} while (true)

console.log("-".repeat(30))

console.log(`Números digitados: ${contagem}`)
console.log(`Soma dos Números: ${soma}`)
console.log(`Maior Número: ${maior}`)
