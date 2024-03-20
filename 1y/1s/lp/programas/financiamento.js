// Lê o valor de um veículo, e mostra a promoção de financiamento, de entrada de 50% e parcelamento em 12x do saldo.

const prompt = require("prompt-sync")()

const valorVeiculo = Number(prompt("Valor do veículo: R$"))
const saldo = valorVeiculo / 2
console.log(`Promoção de financiamento!`)
console.log(`R$${saldo.toFixed(2)} de entrada com o saldo parcelado em 12x de R$${(saldo / 12).toFixed(2)}`)
