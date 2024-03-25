// Lê a quantidade de ovos obtidos em uma granja e informa quantas caixas de dúzias serão preenchidas e quantos ovos sobram.

const prompt = require("prompt-sync")()

const ovos = Number(prompt("Quantidade de Ovos: "))

console.log(`N de Caixas (dúzias): ${Math.floor(ovos / 12)}`)
console.log(`Sobraram ${Math.floor(ovos % 12)} unidades`)
