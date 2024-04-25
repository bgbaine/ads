// Lê 'n' números (até ser digitado zero) e exibe os números em grupos pares ou ímpares

const prompt = require("prompt-sync")()

const numeros = [] 

let numero
do {
    numero = Number(prompt("Número: "))
    
    if (numero != 0) {
        numeros.push(numero)
    }
} while (numero != 0)

console.log("\nPares da Lista")
console.log("-".repeat(30))
for (let i = 0; i < numeros.length; i++) {
    if ((numeros[i] % 2) == 0) {
        console.log(numeros[i])
    }
}

console.log("\nÍmpares da Lista")
console.log("-".repeat(30))
for (let i = 0; i < numeros.length; i++) {
    if ((numeros[i] % 2) != 0) {
        console.log(numeros[i])
    }
}
