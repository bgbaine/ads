/**
 * sistema.js
 */

const prompt = require("prompt-sync")();
const fs = require("fs");

function Produto() {
    let marca;
    let nome;
    let preco;
    let quantidade;
}

const produtos = [];

/* function carregaDados() {
    if (fs.existsSync("produtos.txt")) {
        const carros = fs.readFileSync("produtos.txt", "utf-8").split("\n");

        for (let i = 0; i < produtos.length; i++) {
            const partes = produtos[i].split(";");
            
            modelos.push(partes[0]);
            marcas.push(partes[1]);
            precos.push(Number(partes[2]));
        }
    }
}

function gravaDados() {
    const carros = [];

    for (let i = 0; i < modelos.length; i++) {
        carros.push(modelos[i] + ';' + marcas[i] + ';' + precos[i]);
    }

    fs.writeFileSync("produtos.txt", produtos.join("\n"));

    console.log("Dados salvos em arquivo...");
} */

function inclusao() {
    console.log("\nInclusão de Produto");
    console.log('-'.repeat(57));

    const produto = new Produto();
    
    produto.marca = prompt("Marca................: ");
    produto.nome = prompt("Nome.................: ");
    produto.preco = Number(prompt("Preço R$.............: "));
    produto.quantidade = Number(prompt("Quantidade (unidades): "));

    produtos.push(produto);

    console.log("Ok! Produto Cadastrado com Sucesso!");
}

function listagem() {
    console.log("\nLista dos Produtos Cadastrados");
    console.log('-'.repeat(57));

    console.log("Nº Marca.......: Nome......: Preço R$: Quantidade......:");
    console.log('='.repeat(57));

    for (let i in produtos) {
        console.log(produtos[i].marca, produtos[i].nome, produtos[i].preco, produtos[i].quantidade);
    }
}

function pesquisaMarca(marca) {
    console.log("\nPesquisa por Marca");
    console.log('-'.repeat(57));

    console.log("Nº Nome.......: Preço R$: Quantidade.......:");
    console.log('='.repeat(57));


    for (let i = 0; i < marcas.length; i++) {
        if (marca.toLowerCase() == marcas[i].toLowerCase()) {
            console.log("%s %s %s", String(i + 1).padEnd(2), modelos[i].padEnd(25), precos[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(9));
        }
    }
}
/*
function pesquisaPreco(menorPreco, maiorPreco) {
    console.log("\nPesquisa por Preço");
    console.log('-'.repeat(30));

}

function alteracao() {
    console.log("\nAlteração de Preço de Veículo");
    console.log('-'.repeat(30));

    const modelo = prompt("Modelo: ");

}

function exclusao() {
    console.log("\nExclusão de Veículo");
    console.log('-'.repeat(30));

    const modelo = prompt("Modelo: ");
} */

// ---------------------------------------------------- Programa Principal

/* carregaDados();
 */
do {
    console.log("\nSuplementos Avenida - Sistema de Gerenciamento de Estoque");
    console.log('='.repeat(57));
    console.log("1. Inclusão de Produto");
    console.log("2. Lista dos Produtos Cadastrados");
    console.log("3. Pesquisa por Marca");
    console.log("4. Pesquisa por Intervalo de Preços");
    console.log("5. Alteração de Preço de Produto");
    console.log("6. Exclusão de Produto");
    console.log("7. Finalizar");
    
    const opcao = Number(prompt("Opção: "));

    switch (opcao) {
        case 1:
            inclusao();
            break;
        case 2:
            listagem();
            break;
        case 3:
            pesquisaMarca(prompt("Marca: "));
            break;
        case 5:
            const menorPreco = Number(prompt("Menor preço R$: "));
            const maiorPreco = Number(prompt("Maior preço R$: "));
            pesquisaPreco(menorPreco, maiorPreco);
            break;
        case 5:
            alteracao();
            break;
        case 6:
            exclusao();
            break;
        default:
            break;
    }

    if (opcao == 7) {
        break;
    }

} while (true)

/* gravaDados();
 */
