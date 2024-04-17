// Lê o número de cortes feito por uma cabeleireira e o valor dos cortes e informa o total recebido e o quanto fica com o salão e com a cabeleireira

const prompt = require("prompt-sync")()

const cortes = Number(prompt("No de cortes: "))
const valor = Number(prompt("Valor do corte R$: "))
const total = cortes * valor

console.log(`Total R$: ${total.toFixed(2)}`)
console.log(`Salão R$: ${(total * 0.3).toFixed(2)}`)
console.log(`Cabeleireira R$: ${(total * 0.7).toFixed(2)}`)
