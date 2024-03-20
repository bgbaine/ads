// Lê o valor de um jantar, calcula e mostra a taxa do garçom, bem como o valor total a ser pago.

const prompt = require("prompt-sync")()

const valorJantar = Number(prompt("Valor do jantar: R$"))
const taxaGarcom = Number((valorJantar * 10) / 100)
console.log(`Considerando a taxa de 10% do garçom (R$${taxaGarcom.toFixed(2)}), o valor total a ser pago é de R$${(valorJantar + taxaGarcom).toFixed(2)}`)
