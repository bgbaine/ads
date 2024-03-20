// Lê a descrição e preço de um produto e exibe o preço promocional (descontando os centavos do valor do produto)

const prompt = require("prompt-sync")()

const produto = prompt("Produto: ")
const preco = Math.floor(Number(prompt("Preço R$: ")))

console.log(`Promoção de ${produto}`)
console.log(`Na compra de 2 unidades, o total é R$${(preco * 2).toFixed(2)}`)
