// Lê o valor de um veículo, e mostra a promoção de financiamento, de entrada de 50% e parcelamento em 12x do saldo.

const prompt = require("prompt-sync")()

const valorVeiculo = Number(prompt("Valor do veículo R$:"))
const entrada = valorVeiculo / 2

console.log(`Entrada R$: ${entrada.toFixed(2)}`)
console.log(`Saldo parcelado em 12x de R$${(entrada / 12).toFixed(2)}`)
