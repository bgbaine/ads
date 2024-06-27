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

function carregaDados() {
    if (fs.existsSync("produtos.txt")) {
        const banco = fs.readFileSync("produtos.txt", "utf-8").split("\n");
        
        for (let i in banco) {
            const partes = banco[i].split(';');

            const produto = new Produto();

            produto.marca = partes[0];
            produto.nome = partes[1];
            produto.preco = Number(partes[2]);
            produto.quantidade = Number(partes[3]);

            produtos.push(produto);
        }
    }
}

function gravaDados() {
    if (produtos.length == 0) {
        return 1;
    }

    const banco = [];

    for (let i in produtos) {
        banco.push(produtos[i].marca + ';' + produtos[i].nome + ';' + produtos[i].preco + ';' + produtos[i].quantidade)
    }

    fs.writeFileSync("produtos.txt", banco.join("\n"));

    console.log("Dados salvos em arquivo...");
}

function incluiProduto() {
    console.log("\nInclusão de Produto");
    console.log('-'.repeat(57));

    const produto = new Produto();
    
    produto.marca = prompt("Marca................: ");
    produto.nome = prompt("Nome.................: ");
    produto.preco = Number(prompt("Preço R$.............: ").replace(',', '.'));
    produto.quantidade = Number(prompt("Quantidade (unidades): "));

    produtos.push(produto);

    console.log("Ok! Produto Cadastrado com Sucesso!");
}

const dev = true;
function listaProduto() {
    if (produtos.length == 0) {
        return 1;
    }

    console.log("\nLista dos Produtos Cadastrados");
    console.log('-'.repeat(57));

    console.log("Nº Marca......: Nome......: Preço R$...: Quantidade.....:");
    console.log('='.repeat(57));
    for (let i in produtos) {
        console.log(`${(parseInt(i) + 1)} ${produtos[i].marca.padEnd(2)} ${produtos[i].nome.padStart(6)} ${produtos[i].preco.toLocaleString("pt-br", {minimumFractionDigits: 2})} ${String(produtos[i].quantidade).padStart(3)} unidades`);
    }
}

function pesquisaMarca(marca) {
    console.log("\nPesquisa por Marca");
    console.log('-'.repeat(57));

    console.log("Nº Marca.......: Nome.......: Preço R$: Quantidade.......:");
    console.log('='.repeat(57));

    for (let i in produtos) {
        if (prompt("Marca: ").toLowerCase() == (produtos[i].marca).toLowerCase()) {
            console.log(produtos[i].marca, produtos[i].nome, produtos[i].preco, produtos[i].quantidade);
        }
    }
}
/*
function pesquisaPreco(menorPreco, maiorPreco) {
    console.log("\nPesquisa por Preço");
    console.log('-'.repeat(57));

}

function alteraPreco() {
    console.log("\nAlteração de Preço de Produto");
    console.log('-'.repeat(57));

    const produto = prompt("Produto: ");

}

function excluiProduto() {
    console.log("\nExclusão de Produto");
    console.log('-'.repeat(57));

    const produto = prompt("Produto: ");
} */

// ---------------------------------------------------- Programa Principal

carregaDados();

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
            incluiProduto();
            break;
        case 2:
            listaProduto();
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
            alteraPreco();
            break;
        case 6:
            excluiProduto();
            break;
        default:
            break;
    }

    if (opcao == 7) {
        break;
    }

} while (true)

if (dev)
    gravaDados();
