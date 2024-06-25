// Lê o ano de nascimento de um usuário e informe se ele é menor ou maior de idade.

const prompt = require("prompt-sync")();


const idade = Date.getFullYear() - Number(prompt("Ano de Nascimento: "));

if (idade > 17) {
    console.log("Você é maior de idade");
} else {
    console.log("Você é menor de idade");
}
