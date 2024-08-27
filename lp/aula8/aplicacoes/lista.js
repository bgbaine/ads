const prompt = require("prompt-sync")()

const amigos = []

console.log("Informe o nome de 5 amigos: ")
console.log("---------------------------------")

for (let i = 1; i < 6; i++) {
    const nome = prompt(`${i}º amigo(a): `)
    amigos.push(nome)
}

console.log("---------------------------------")
console.log(`Seu primeiro amigo é ${amigos[0]}`)
console.log("---------------------------------")

console.log(`\nLista dos amigos informados\n`)

for (let i = 0; i < 5; i++) {
    console.log(`${i + 1}º: ${amigos[i]}`)
}
