// Lê produto e preço, adiciona-os às respectivas listas e exibe as listas, bem como o total

const prompt = require("prompt-sync")()

const produtos = []
const precos = []

console.log("Informe a lista de compras do super")
console.log("-".repeat(30))

let continua
do {
    const produto = prompt("Produto: ")
    const preco = Number(prompt("Preço: "))
    
    produtos.push(produto)
    precos.push(preco)

    continua = prompt("Continuar (S/N): ").toUpperCase()
} while (continua == "S")

console.log(`\nLista dos produtos adicionados`)
console.log("-".repeat(30))

let total = 0
for (let i = 0; i < produtos.length; i++) {
    console.log(`${produtos[i]} - R$: ${(precos[i]).toFixed(2)}`)
    total += precos[i]
}

console.log("-".repeat(30))
console.log(`Total Previsto R$: ${total.toFixed(2)}`)
