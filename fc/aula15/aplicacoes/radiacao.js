// Lê o índice de radiação medido e emite a notificação adequada.

const prompt = require("prompt-sync")();


const indice = Number(prompt("Indíce de radiação: "));

if (indice >= .6) {
    console.log("\nOs três grupos devem suspender suas atividades");
} else if (indice >= .45) {
    console.log("\nO primeiro e segundo grupo devem suspender suas atividades");
} else if (indice >= .35) {
    console.log("\nO primeiro grupo deve suspender suas atividades");
} else if (indice >= 0.04) {
    console.log("\nO índice de radiação é aceitável");
} else {
    console.log("\nO índice de radiação inválido");
}
