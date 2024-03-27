// Lê a descrição e preço de um produto. Se o preço for inferior a R$100, exibe "Somente à vista", senão exibe "Pode pagar em 3x de ..." e o valor da parcela.

const prompt = require("prompt-sync")()

const produto = prompt("Produto: ")
const preco = Number(prompt("Preço R$: "))

if (preco < 100) {
    console.log(`Somente à vista`)
} else {
    console.log(`Pode pagar em 3x de ${(preco / 3).toFixed(2)}`)
}
