// Lê um o nome de 'n' competidores ate ser digitado Fim e exibe os competidores em ordem inversa da inserção

const prompt = require("prompt-sync")();

console.log("Informe os competidores ou 'Fim' para sair");
fazLinha(47);

const competidores = [];

let competidor = ''
do {
    competidor = prompt(`${competidores.length + 1}º Competidor: `);

    if (competidor.toLowerCase() != 'fim') {
        competidores.push(competidor);
    }
} while (competidor.toLowerCase() != 'fim');

console.log("\nLista dos Competidores:");
fazLinha(23);

for (let i = competidores.length - 1; i > -1; i--) {
    console.log(competidores[i]);
}

function fazLinha(numero) {
    console.log('-'.repeat(numero));
}
