// Lê a hora de entrada e saída de um veículo em um estacionamento e informa a quantidade de horas a serem pagas e o valor cobrado (dado o valor de R$5.00 por hora).

const prompt = require("prompt-sync")()

const entrada = Math.floor(Number(prompt("Hora de entrada: ")))
const saida = Math.floor(Number(prompt("Hora de saída: ")))

const horas = Math.abs(entrada - saida)

console.log(`Cobrar: ${horas} hora(s)`)
console.log(`Valor R$: ${(horas * 5).toFixed(2)}`)
