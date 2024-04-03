// Lê a distância a ser percorrida por um cliente e o horário de viagem e informa o valor a ser pago pelo cliente.

const prompt = require("prompt-sync")()

const distancia = Number(prompt("Distância (em Km): "))
const horario = Number(prompt("Horário: "))

if (horario > 5 && horario < 20) {
    console.log(`Valor a pagar R$: ${(distancia * 2).toFixed(2)}`)
} else {
    console.log(`Valor a pagar R$: ${(distancia * 3).toFixed(2)}`)
}
