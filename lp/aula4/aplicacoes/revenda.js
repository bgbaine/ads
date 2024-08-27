// Lê o modelo, marca e preço de um veículo e calcula e exibe o valor do desconto para pagamento á vista, que é de 10% para veículos da marca Fiat e 20% para as demais marcas. Exibe também o valor final.

const prompt = require("prompt-sync")()

const modelo = prompt("Modelo: ")
const marca = prompt("Marca: ")
const preco = Number(prompt("Preço R$: "))

let desconto

if (marca == "Fiat") {
    desconto = preco * 0.1
} else {
    desconto = preco * 0.2
}

console.log(`Desconto: ${desconto.toFixed(2)}`)
console.log(`Preço à Vista: ${(preco - desconto).toFixed(2)}`)
