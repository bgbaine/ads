// Lê disciplinas e conceitos de um aluno enquanto o usuário desejar e um conceito que o usuário deseja filtrar e exibe as disciplinas filtradas, bem como as demais

const prompt = require("prompt-sync")();

const disciplinas = [];
const conceitos = [];

let continua;
do {
    disciplinas.push(prompt("Disciplina: "));
    conceitos.push(prompt("Conceito: ").toUpperCase());

    continua = prompt("Continuar (S/N): ").toUpperCase();
} while (continua == 'S');

console.log()
const filtro = prompt("Qual conceito filtrar: ").toUpperCase();

console.log(`\nDisciplinas com ${filtro}`);
fazLinha(17);

for (let i = 0; i < disciplinas.length; i++) {
    if (conceitos[i] == filtro) {
        console.log(disciplinas[i]);
    }
}

console.log(`\nOutros conceitos`);
fazLinha(17);

for (let i = 0; i < disciplinas.length; i++) {
    if (conceitos[i] != filtro) {
        console.log(`${disciplinas[i]} - ${conceitos[i]}`);
    }
} 

function fazLinha(numero) {
    console.log('-'.repeat(numero));
}
