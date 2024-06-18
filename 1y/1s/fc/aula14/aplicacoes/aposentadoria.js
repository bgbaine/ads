// Lê nome, ano de nascimento e ano que o empregado começou a trabalhar e exibe idade, tempo de serviço e se o funcionário pode requerer aposentadoria.

const prompt = require("prompt-sync")();


const ano = 2024;
const nome = prompt("Nome: ");
const idade = ano - Number(prompt("Ano de Nascimento: "));
const tempoDeServico = ano - Number(prompt("Ano que começou a trabalhar: "));

console.log("Idade: %i", idade);
console.log("Tempo de Serviço: %i", tempoDeServico);

if (idade > 59 || tempoDeServico > 24 || (idade > 54 && tempoDeServico > 19)) {
    console.log("%s, você pode requerer aposentadoria", nome);
} else {
    console.log("%s, você não pode requerer aposentadoria", nome);
}
