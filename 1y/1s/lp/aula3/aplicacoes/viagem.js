// Lê o destino e duração de uma viagem em dias e horas e calcula e informa a duração apenas em horas.

const prompt = require("prompt-sync")()

const destino = prompt("Destino: ")
const diasEmHoras = Number(prompt("N Dias: ")) * 24
const horas = Number(prompt("N Horas: "))

console.log(`A viagem para ${destino} dura ${diasEmHoras + horas} horas`)
