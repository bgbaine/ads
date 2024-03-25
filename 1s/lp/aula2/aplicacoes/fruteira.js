// Lê o nome e quantidade de uma fruta e mostra ambos dados.

const prompt = require("prompt-sync")()

const fruta = prompt("Fruta: ")
const quant = prompt("Quantidade: ")
console.log(`Foram colhidas ${quant} unidades de ${fruta}`)
