// Lê a distância percorrida por um ciclista em metros e exibe o equivalente em km e metros.

const prompt = require("prompt-sync")()

const distancia = prompt("Distância Percorrida (m): ")

console.log(`Equivale a ${Math.floor(distancia / 1000)}km e ${distancia % 1000}m`)
