// Lê o nome de uma (ou mais) criança(s) e o número de gotas aplicadas e exibe quantas crianças foram vacinadas, quantas gotas aplicadas e quantos frascos foram abertos

const prompt = require("prompt-sync")();

console.log("Campanha de Vacinação");
fazLinha(30)

let continua = '', vacinadosTotal = gotasTotal = 0;
do {
    const vacinado = prompt("Criança: ");
    vacinadosTotal++;
    const gotas = Number(prompt("Nº Gotas: "));
    gotasTotal += gotas;

    console.log(`${vacinado} vacinado(a) com ${gotas} gotas`);

    continua = prompt("Continuar (S/N): ").toUpperCase();
    if (continua == 'S') {
        console.log()
    }
} while (continua == 'S');

fazLinha(30)
console.log(`Crianças vacinadas: ${vacinadosTotal}`);
console.log(`Total de gotas: ${gotasTotal}`);
console.log(`Nº de frascos abertos: ${Math.ceil(gotasTotal / 30)}`);

function fazLinha(numero) {
    console.log('-'.repeat(numero));
}
