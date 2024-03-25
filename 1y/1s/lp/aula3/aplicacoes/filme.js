// Lê o título e duração de um filme em minutos e informa a duração em horas e minutos.

const prompt = require("prompt-sync")()

const filme = prompt("Filme: ")
const duracao = Number(prompt("Duração (min): "))

console.log(`O filme ${filme}`)
console.log(`Tem a duração de ${Math.floor(duracao / 60)} horas e ${duracao % 60} minutos.`)
