// Lê o nome e número de acertos de candidatos de um concurso e exibe os dados e situação do usuário 

const prompt = require("prompt-sync")()

const candidatos = []
const acertos = []

let continua
do {
    const candidato = prompt(`${candidatos.length + 1}º Candidato: `)
    const numero = Number(prompt("Nº de acertos: "))

    candidatos.push(candidato)
    acertos.push(numero)

    continua = prompt("Continua (S/N): ").toUpperCase()
} while (continua == "S")

console.log("\nResultado do Concurso")
console.log("-".repeat(30))

for (let i = 0; i < candidatos.length; i++) {
    if (acertos[i] > 29) {
        console.log(`${candidatos[i]} - ${acertos[i]} acertos - Aprovado(a)`)
    } else {
        console.log(`${candidatos[i]} - ${acertos[i]} acertos - Reprovado(a)`)
    }
}
