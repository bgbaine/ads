// Lê modelo e preço de 'n' veículos (até ser digitado Fim) e o valor do frete e exibe o valor final de cada veículo acrescido do frete 

const prompt = require("prompt-sync")()


const veiculos = []
const precos = []

do {
    let veiculo = prompt(`${veiculos.length + 1}º veículo: `)
    if (veiculo == "Fim") {
        break
    }

    const preco = Number(prompt("Preço R$: "))

    veiculos.push(veiculo)
    precos.push(preco)
} while(true)

const frete = Number(prompt("\nFrete R$: "))

console.log("\nTabela de Preços (com Frete)")
console.log("-".repeat(30))

for (let i = 0; i < veiculos.length; i++) {
    console.log(`${veiculos[i]} - R$ ${(precos[i] + frete).toFixed(2)}`)
}
