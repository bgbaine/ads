// Lê o nome de dez clubes e lista os ogos com os clubes na ordem formada

const prompt = require("prompt-sync")()

const clubes = []

for (let i = 0; i < 10; i++) {
    const clube = prompt(`${i + 1}º Clube: `)

    clubes.push(clube)
}

console.log("\nJogos")
console.log("-".repeat(30))

for (let i = 0; i < clubes.length; i = i + 2) {
    console.log(`${clubes[i]} x ${clubes[i + 1]}`)
}
