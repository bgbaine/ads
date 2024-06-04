// Lê o valor do saque desejado em um terminal ate ser digitado zero e exibe mensagem indicando se o saque é válido, além dos saques válidos e seu total

const prompt = require("prompt-sync")();

const saques = [];
let total = 0;

console.log("Informe o valor do saque ou 0 para sair");
fazLinha(39);

while (true) {
    const saque = Number(prompt("Saque R$: "));

    if (saque == 0) {
        break
    }

    if (saque % 10) {
        console.log("Inválido...");
    } else {
        console.log("Ok, saque válido");
        saques.push(saque);
        total += saque;
    }
}

console.log("\nSaques Válidos");
console.log('-'.repeat(20));

for (let i = 0; i < saques.length; i++) {
    console.log(`R$ ${saques[i].toFixed(2)}`);
}

fazLinha(20);
console.log(`Total R$: ${total.toFixed(2)}`);

function fazLinha(numero) {
    console.log('-'.repeat(numero));
}
