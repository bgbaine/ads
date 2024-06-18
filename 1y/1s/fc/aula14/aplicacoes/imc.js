// Lê a o peso e a altura de uma pessoa, e exibe seu Índice de Massa Corporal (IMC) e classificação.

const prompt = require("prompt-sync")();


const peso = Number(prompt("Peso: "));
const altura = Number(prompt("Altura: "));

const imc = peso / (altura * altura);

if (imc < 18.5){
    console.log("Abaixo do peso");
} else if (imc < 24.9 && imc >= 18.5) {
    console.log("Peso normal");
} else if (imc < 29.9 && imc >= 25) {
    console.log("Sobrepeso");
} else {
    console.log("Obesidade");
}
