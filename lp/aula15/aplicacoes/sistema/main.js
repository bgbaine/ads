/**
 * sistema.js
 */

const io = require("./utils/io");
const main = require("./core/main_functions");
const prompt = require("prompt-sync")();

// ---------------------------------------------------- Programa Principal

const produtos = [];

io.carregaDados(produtos);

do {
    main.imprimeOpcoes();
    
    const opcao = Number(prompt("Opção: "));

    switch (opcao) {
        case 1:
            main.adicionaProduto(produtos);
            break;
        case 2:
            main.listaProdutos(produtos);
            break;
        case 3:
            main.pesquisaMarca(produtos);
            break;
        case 4:
            main.pesquisaPreco(produtos);
            break;
        case 5:
            main.alteraPreco(produtos);
            break;
        case 6:
            main.alteraQuantidade(produtos);
            break;
        case 7:
            main.excluiProduto(produtos);
            break;
        default:
            break;
    }

    if (opcao == 8) {
        break;
    }

} while (true)

io.gravaDados(produtos);
