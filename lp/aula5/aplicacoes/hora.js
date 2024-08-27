// Lê a hora no Brasil e informa a hora na França.

const prompt = require("prompt-sync")()

const horaBrasil = Number(prompt("Hora no Brasil: "))
let horaFranca = horaBrasil + 5

if (horaFranca > 24) {
    console.log(`Hora na França: ${horaFranca % 24}`)
} else {
    console.log(`Hora na França: ${horaFranca}`)
}
