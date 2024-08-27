// Lê o peso de um maratonista antes e depois da prova e informa quantos quilos e gramas ele perdeu

const prompt = require("prompt-sync")()

const inicial = Number(prompt("Peso Inicial: "))
const final = Number(prompt("Peso Final: "))
const diferenca = inicial - final

console.log(`Você perdeu ${Math.floor(diferenca)} kg e ${Math.round((diferenca % 1) * 1000)} gr`)
