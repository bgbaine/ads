// Lê quantidade de compras, se é novo cliente e se possui cupom e exibe se a pessoa terá desconto na compra ou não

const prompt = require("prompt-sync")();


const compras = Number(prompt("Informe a quantidade de compras: "));
const novo = prompt("É um novo cliente? (S/N) ").toLowerCase();
const cupom = prompt("Possui cupom? (S/N) ").toLowerCase();

if (compras > 4 || (novo == 's' && cupom == 's')) {
    console.log("\nDesconto garantido. Vem que tem!");
} else {
    console.log("\nChora, trouxa!");
}
