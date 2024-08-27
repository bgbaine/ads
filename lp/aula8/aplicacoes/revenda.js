// Lê o preço e o modelo de 'n' veículos e exibe a lista dos veículos, bem como o preço médio dos veículos

const prompt = require("prompt-sync")()

const veiculos = []
const precos = []

let continua
do {
    const veiculo = prompt(`${veiculos.length + 1}º Veículo: `)
    const preco = Number(prompt("Preço R$: "))

    veiculos.push(veiculo)
    precos.push(preco)

    continua = prompt("Continua (S/N): ").toUpperCase()
} while(continua == "S")

console.log("\nLista dos Veículos da Revenda")
console.log("-".repeat(30))

let total = 0
for (let i = 0; i < veiculos.length; i++) {
    console.log(`${veiculos[i]} - R$ ${(precos[i]).toFixed(2)}`)
    total += precos[i]
}

console.log(`Preço Médio dos Veículos: R$ ${(total / veiculos.length).toFixed(2)}`)
