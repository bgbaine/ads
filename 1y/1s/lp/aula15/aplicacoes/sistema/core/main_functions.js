const p = require("../core/Produto");
const form = require("../utils/formatting");
const prompt = require("prompt-sync")();
const aux = require("../utils/auxiliary");

// --------------------------------------------------------  Funções principais

module.exports = {
    imprimeOpcoes: function() {
        form.limpaTela();
        
        console.log(
            "\nSuplementos Avenida - Sistema de Gerenciamento de Estoque"
        );
        console.log('='.repeat(70));
        console.log("1. Inclusão de Produto");
        console.log("2. Lista dos Produtos Cadastrados");
        console.log("3. Pesquisa por Marca");
        console.log("4. Pesquisa por Intervalo de Preços");
        console.log("5. Alteração de Preço de Produto");
        console.log("6. Alteração de Quantidade de Produto");
        console.log("7. Exclusão de Produto");
        console.log("8. Finalizar");
    },
    
    adicionaProduto: function(lista) {
        form.limpaTela();
        form.imprimeTitulo("Inclusão de Produto");
    
        while (true) {
            const produto = new p.Produto();
            
            produto.marca = prompt("Marca................: ");
            produto.nome = prompt("Nome.................: ");
            
            for (let i in lista) {
                if (
                    produto.marca.toLowerCase() == lista[i].marca.toLowerCase()
                    && produto.nome.toLowerCase() == lista[i].nome.toLowerCase()
                ) {
                    console.log("\nProduto já cadastrado no sistema!");

                    if (aux.desejaSair()) {
                        return 0;
                    }
                }
            }
    
            produto.preco = Number(
                prompt("Preço R$.............: ").replace(',', '.')
            );
            produto.quantidade = Number(prompt("Quantidade (unidades): "));
    
            lista.push(produto);
    
            console.log("\nOk! Produto Cadastrado com Sucesso!");
            
            if (aux.deseja("cadastrar mais um produto?")) {
                console.log();
                continue;
            } else {
                break;
            }
        }
    }, 
    
    listaProdutos: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }
    
        form.limpaTela();
    
        while (true) {
            form.imprimeTitulo("Lista dos Produtos Cadastrados");
        
            form.imprimeCabecalho();
        
            for (let i in lista) {
                aux.buscaProdutos(i, lista);
            }
    
            if (aux.desejaSair()) {
                break;
            } else {
                console.log();
            }
        }
    },

    pesquisaMarca: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }
    
        form.limpaTela();
        form.imprimeTitulo("Pesquisa por Marca");
    
        const marca = prompt("Marca do Produto: ").toLowerCase();
        
        while (true) {
            form.imprimeCabecalho();
    
            for (let i in lista) {
                if ((lista[i].marca).toLowerCase().includes(marca)) {
                    aux.buscaProdutos(i, lista);
                }
            }
    
            if (aux.desejaSair()) {
                return 0;
            } else {
                console.log();
            }
        }
    }, 
    
    pesquisaPreco: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }
        
        form.limpaTela();
        form.imprimeTitulo("Pesquisa por Preço");
    
        const menorPreco = Number(prompt("Menor preço R$: "));
        const maiorPreco = Number(prompt("Maior preço R$: "));
    
        while (true) {
            console.log();
    
            form.imprimeCabecalho();
        
            for (let i in lista) {
                if (
                    lista[i].preco <= maiorPreco && lista[i].preco >= menorPreco
                ) {
                    aux.buscaProdutos(i, lista);
                }
            }
    
            if (aux.desejaSair()) {
                break;
            }
        }
    }, 
    
    alteraPreco: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }

        form.limpaTela();
        form.imprimeTitulo("Alteração de Preço de Produto");
        
        while (true) {
            console.log(
                "OBS: O nome inserido precisa ser " +
                "exatamente igual ao nome cadastrado!"
            );
            
            const marca = prompt("Marca do Produto: ").toLowerCase();
            const nome = prompt("Nome do Produto: ").toLowerCase();
            
            for (let i in lista) {
                if (
                    lista[i].marca.toLowerCase() == marca
                    && lista[i].nome.toLowerCase() == nome
                ) {
                    console.log(
                        "\nProduto Encontrado!\nAtualmente o produto " + 
                        `${lista[i].nome} custa R$${
                            lista[i].preco.toLocaleString(
                            "pt-br", {minimumFractionDigits: 2})
                            }\n`
                        );

                        while (true) {
                            const preco = prompt(
                                "Digite o novo preço R$: "
                            ).replace(',', '.');
                            
                            if (lista[i].preco != preco) {
                                lista[i].preco = preco;
                                console.log("\nPreço atualizado com sucesso!");

                                if (aux.desejaSair()) {
                                    return 0;
                                }
                            } else {
                                console.log(
                                    "Os preços são iguais, tente novamente!\n"
                                );
                            }
                        }
                }
            }
            console.log("\nProduto Não Encontrado!");

            if (aux.desejaSair()) {
                return 0;
            }
        }
    }, 
    
    alteraQuantidade: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }

        form.limpaTela();
        form.imprimeTitulo("Alteração de Quantidade de Produto");
        
        while (true) {
            console.log(
                "OBS: O nome inserido precisa ser " +
                "exatamente igual ao nome cadastrado!"
            );
            
            const marca = prompt("Marca do Produto: ").toLowerCase();
            const nome = prompt("Nome do Produto: ").toLowerCase();
            
            for (let i in lista) {
                if (
                    lista[i].marca.toLowerCase() == marca
                    && lista[i].nome.toLowerCase() == nome
                ) {
                    console.log(
                        "\nProduto Encontrado!\nAtualmente o produto " + 
                        `${lista[i].nome} consta com ${lista[i].quantidade} ` +
                        "unidades \n"
                        );

                        while (true) {
                            console.log(
                                "OBS: Se a quantidade inserida for menor " +
                                "ou igual a zero o produto será excluído"
                            );
                            
                            const quantidade = prompt(
                                "Digite a nova quantidade: "
                            );
                            
                            if (quantidade < 1) {
                                lista.splice(parseInt(i), 1);
                                console.log("\nProduto excluído com sucesso!");
                            } else {
                                lista[i].quantidade = quantidade;
                                console.log(
                                    "\nQuantidade atualizada com sucesso!"
                                );
                            }


                            if (aux.desejaSair()) {
                                return 0;
                            }                   
                        }
                }
            }
            console.log("\nProduto Não Encontrado!");

            if (aux.desejaSair()) {
                return 0;
            }
        }
    },

    excluiProduto: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }
    
        form.limpaTela();
        form.imprimeTitulo("Exclusão de Produto");
    
        while (true) {
            const marca = prompt("Marca do Produto: ").toLowerCase();
            const nome = prompt("Nome do Produto: ").toLowerCase();

            for (let i in lista) {
                if (
                    lista[i].marca.toLowerCase() == marca
                 && lista[i].nome.toLowerCase() == nome
                ) {
                    console.log(
                        `\nVocê selecionou o produto ${lista[i].nome} da marca ` +
                        `${lista[i].marca}`
                    );
                    
                    if (aux.deseja("realmente excluir o produto selecionado?"))
                    {
                        lista.splice(parseInt(i), 1);
                        console.log("\nOk! Produto Excluído com Sucesso!");
                    } else {
                        console.log();
                    }
                    

                    if (aux.desejaSair()) {
                        return 0;
                    }
                }
            }
            console.log("\nProduto Não Encontrado!");
            if (aux.desejaSair()) {
                return 0;
            }
        }
    }
};
