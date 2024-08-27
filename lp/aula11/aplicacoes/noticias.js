// Lê dez notícias, solicita o número de notícias que o usuário deseja ver e lista as notícias mais recentes 

const prompt = require("prompt-sync")()


const noticias = []

for (let i = 0; i < 10; i++) {
    const noticia = prompt(`${i + 1}ª Notícia: `)

    noticias.push(noticia)
}

let numero = Number(prompt("Quantas Notícias Exibir: "))

console.log("\nÚltimas Notícias")
console.log("-".repeat(30))

for (let i = 9; numero > 0; i--, numero--) {
    console.log(`${noticias[i]}`)
}
