// Lê o número de torcedores inscritos em uma excursão e informa quantos ônibus são necessários e quantos lugares ainda estão disponíveis no último ônibus.

const prompt = require("prompt-sync")()

const capacidade = 40

const torcedores = Number(prompt("Nº de torcedores: "))

console.log(`Nº de Ônibus: ${Math.ceil(torcedores / capacidade)}`)

const lugares = torcedores % capacidade

if ((lugares % capacidade) == 0) {
    console.log(`Lugares ainda disponíveis: 0`)
} else {
    console.log(`Lugares ainda disponíveis: ${capacidade - lugares}`)
}
