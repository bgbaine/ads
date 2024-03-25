// Lê o nome e a idade de um aluno, calcula o ano que ele nasceu e informa seu nome e ano de nascimento.

const prompt = require("prompt-sync")()

const nome = prompt("Nome: ")
const idade = Number(prompt("Idade: "))

console.log(`${nome}, você nasceu em ${2024-idade}`)
