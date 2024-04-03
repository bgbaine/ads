// Lê um número e informa se o programa possue ou não raiz exata.

const prompt = require("prompt-sync")()

const numero = Number(prompt("Número: "))
const raiz = Math.sqrt(numero)

if ((raiz % 1) == 0) {
    console.log(`A raiz de ${numero} é ${raiz}`)
} else {
    console.log(`${numero} não possui raiz exata`)
}
