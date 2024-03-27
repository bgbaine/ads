// Lê nome e ano de nascimento de um aluno e calcula e informa a idade do aluno e se ele é maior de idade.

const prompt = require("prompt-sync")()

const nome = prompt("Nome do Aluno: ")
const ano = Number(prompt("Ano de Nascimento: "))

const idade = 2024 - ano

console.log(`Idade: ${idade} anos`)

if (idade >= 18) {
    console.log(`${nome}, você é maior de idade`)
} else {
    console.log(`${nome}, você é menor de idade`)
}
