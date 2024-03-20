// Lê o valor de um jantar, calcula e mostra a taxa do garçom, bem como o valor total a ser pago.

const prompt = require("prompt-sync")()

const valorJantar = Number(prompt("Valor do jantar R$:"))
const taxaGarcom = (valorJantar * 10) / 100

console.log(`Taxa do Garçom R$:(${taxaGarcom.toFixed(2)})`)
console.log(`Valor Total R$:${(valorJantar + taxaGarcom).toFixed(2)}`)
