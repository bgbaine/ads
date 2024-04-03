// Lê o número de torcedores inscritos em uma excursão e informa quantos ônibus são necessários e quantos lugares ainda estão disponíveis no último ônibus.

const prompt = require("prompt-sync")()

const torcedores = Number(prompt("Nº de torcedores: "))

console.log(`Nº de Ônibus: ${Math.ceil(torcedores / 40)}`)

const lugares = 40 - (torcedores % 40)

if ((lugares % 40) == 0) {
    console.log(`Lugares ainda disponíveis: 0`)
} else {
    console.log(`Lugares ainda disponíveis: ${lugares}`)
}
