// Lê a nota de um aluno e atribui um conceito.

const prompt = require("prompt-sync")();


const nota = Number(prompt("Nota: "));

let conceito;

switch (true) {
    case nota >= 90:
        conceito = 'A';
        break;
    case nota >= 80 && nota < 90:
        conceito = 'B';
        break;
    case nota >= 70 && nota < 80:
        conceito = 'C';
        break;
    case nota >= 90 && nota < 70:
        conceito = 'D';
        break;
    default:
        conceito = 'F';
        break;
}

console.log("\nNota: %i\nConceito: %s", nota, conceito);
