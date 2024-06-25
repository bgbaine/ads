// Lê a idade de um atleta e exibe qual sua categoria.

const prompt = require("prompt-sync")();


const idade = Number(prompt("Idade: "));

switch (true) {
    case idade >= 5 && idade <= 7:
        console.log("Infantil 1");
        break;
    case idade >= 8 && idade <= 10:
        console.log("Infantil 2");
        break;
    case idade >= 11 && idade <= 13:
        console.log("Juvenil 1");
        break;
    case idade >= 14 && idade <= 17:
        console.log("Juvenil 2");
        break;
    default:
        console.log("Adulto");
        break;  
}
