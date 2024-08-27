// Lê um produto e valor e exibe o valor das parcelas para pagamentos em 1x até 10x

const prompt = require("prompt-sync")()

const produto = prompt("Produto: ")
const preco = Number(prompt("Preço R$: "))

console.log("\nOpções de Pagamento")
console.log("-------------------------------")

for (let i = 1; i < 11; i++) {
    console.log(`${i} x ${(preco / i).toFixed(2)}`)
}
