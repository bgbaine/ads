// Lê uma palavra e exibe se a palavra atende aos critérios.

const prompt = require("prompt-sync")();


const palavra = prompt("Palavra: ");

/* if (palavra[0] == 'A' || palavra[palavra.length - 1] == 'o') {
    console.log("A palavra atende aos critérios");
} else {
    console.log("A palavra não atende aos critérios");
} */
if (palavra[0] != 'A' && palavra[palavra.length - 1] != 'o') {
    console.log("A palavra não atende aos critérios");
} else {
    console.log("A palavra atende aos critérios");
}
