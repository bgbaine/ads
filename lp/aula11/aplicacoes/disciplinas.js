// Lê disciplina e conceito de 'n' disciplinas e informa em quantas o aluno foi aprovado e reprovado

const prompt = require("prompt-sync")()


let continua = '', aprovado = 0, reprovado = 0

do {
    prompt("Disciplina: ")
    const conceito = prompt("Conceito: ").toUpperCase()

    switch(conceito) {
        case 'A':
        case 'B':
        case 'C':
            aprovado++
            break
        default:
            reprovado++
            break
    }

    continua = prompt("Continua (S/N): ").toUpperCase()
} while(continua == 'S')

console.log("Resumo do Semestre: ")
console.log("-".repeat(30))

console.log(`Aprovado: ${aprovado} disciplina(s)`)
console.log(`Reprovado: ${reprovado} disciplina(s)`)
