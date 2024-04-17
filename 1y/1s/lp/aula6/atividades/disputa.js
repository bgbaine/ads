// Lê o nome de duas equipes e o resultado da partida e informa se houve equipe vencedora e, se a partida teve gols, o número de gols marcados

const prompt = require("prompt-sync")()

const time1 = prompt("1o time: ")
const gols1 = Number(prompt("Gols: "))
const time2 = prompt("1o time: ")
const gols2 = Number(prompt("Gols: "))

if (gols1 > gols2) {
    console.log(`O vencedor foi o ${time1}`)
} else if (gols2 > gols1) {
    console.log(`O vencedor foi o ${time2}`)
} else {
    console.log(`A partida foi um empate`)
}

if (gols1 + gols2 > 0) {
    console.log(`A partida teve ${gols1 + gols2} gols`)
}
