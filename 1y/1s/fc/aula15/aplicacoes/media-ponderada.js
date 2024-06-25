// Lê três números e calcule a média ponderada desses números e exibe se o aluno foi aprovado ou reprovado.

const prompt = require("prompt-sync")();


const nota1 = Number(prompt("1ª Nota: "));
const nota2 = Number(prompt("2ª Nota: "));
const nota3 = Number(prompt("3ª Nota: "));
let media = 0;

if (nota1 > nota2 && nota1 > nota3) {
    media = calcularMedia(nota1, [nota2, nota3]);
} else if (nota2 > nota1 && nota2 > nota3) {
    media = calcularMedia(nota2, [nota1, nota3]);
} else {
    media = calcularMedia(nota3, [nota1, nota2]);
}

if (media >= 7) {
    console.log("APROVADO - Média: " + media);
} else {
    console.log("REPROVADO - Média: " + media);
}

function calcularMedia(maior, restante) {
    return ((maior * 4) + (restante[0] * 3) + (restante[1] * 3)) / 10;
}
