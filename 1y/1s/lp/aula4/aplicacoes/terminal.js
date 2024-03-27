// Lê o valor do saque de um cliente em um terminal de banco. Sabendo que o terminal dispõe apenas de notas de R$10,00, verifica se o valor pode ser pago com as notas disponíveis e informa a quantidade de notas necessárias para realização do saque ou a mensagem "Não é possível pagar... com notas de R$10".

const prompt = require("prompt-sync")()

const valor = Number(prompt("Valor do Saque R$: "))

if ((valor % 10) == 0) {
    console.log(`São necessárias ${valor / 10} notas de R$ 10 para a realização do saque`)
} else {
    console.log(`Não é possível pagar ${valor.toFixed(2)} com notas de R$ 10`)
}
