// Lê quatro notas de um aluno e exibe o conceito e se o aluno foi aprovado ou não baseado na média das notas.

const prompt = require("prompt-sync")();


const nota1 = Number(prompt("Nota 1: "));
const nota2 = Number(prompt("Nota 2: "));
const nota3 = Number(prompt("Nota 3: "));
const nota4 = Number(prompt("Nota 4: "));

const media = (nota1 + (nota2 * 2) + (nota3 * 3) + nota4) / 7

let conceito = ''

switch (true) {
    case media >= 9 && media <= 10:
        conceito = 'A';
        break;
    case media >= 8 && media < 9:
        conceito = 'B';
        break;
    case media >= 6 && media < 8:
        conceito = 'C';
        break;
    case media >= 4 && media < 6:
        conceito = 'D';
        break;
    default:
        conceito = 'E';
        break;
}

if (conceito == 'A' || conceito == 'B' || conceito == 'C') {
    console.log("\nConceito: %s\nAPROVADO", conceito);
} else {
    console.log("\nConceito: %s\nREPROVADO", conceito);
}
