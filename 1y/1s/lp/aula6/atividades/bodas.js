// Lê o nome do funcionário, o ano que entrou na empresa e o ano atual e informa se ele será convidado para a Festa de Bodas ou não

const prompt = require("prompt-sync")()

const nome = prompt("Funcionário: ")
const anoEntrada = Number(prompt("Ano que entrou: "))
const anoAtual = Number(prompt("Ano atual: "))

if ((anoAtual - anoEntrada) % 5 == 0) {
    console.log(`${nome}, você será convidado para a Festa de Bodas em ${anoAtual}!`)
} else {
    console.log(`${nome}, você não deve participar da Festa de Bodas em ${anoAtual}`)
}
