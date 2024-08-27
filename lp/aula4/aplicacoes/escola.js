// Lê o nome e duas notas de um aluno, calcula a média e à exibe, além de exibir se o aluno foi aprovado (caso tenha média superior à 7).

const prompt = require("prompt-sync")()

const nome = prompt("Nome do Aluno: ")
const nota1 = Number(prompt("1a Nota: "))
const nota2 = Number(prompt("2a Nota: "))

const media = (nota1 + nota2) / 2

console.log(`Média: ${media.toFixed(1)}`)

if (media >= 7) {
    console.log(`Parabéns ${nome}. Você foi aprovado(a)`)
} else {
    console.log(`Ops... ${nome}. Você foi reprovado(a)`)
}
