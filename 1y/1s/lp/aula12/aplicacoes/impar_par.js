// Lê dois números, e exibe se ambos são pares/ímpares ou misturados

const prompt = require("prompt-sync")();

const numero1 = Number(prompt("1º Número: "));
const numero2 = Number(prompt("2º Número: "));

switch ((numero1 % 2) + (numero2 % 2)) {
    case 0:
        console.log("Os 2 números são pares")
        break
    case 2:
        console.log("Os 2 números são ímpares")
        break
    default:
        console.log("Os números estão misturados")
        break
}
