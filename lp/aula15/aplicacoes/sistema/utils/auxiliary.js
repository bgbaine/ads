const prompt = require("prompt-sync")();

// --------------------------------------------------------  Funções auxiliares

module.exports = {
    estaVazia: function(lista) {
        if (lista.length == 0) {
            console.log("Nenhum produto cadastrado!");
            return true;
        }
    }, 
    
    buscaProdutos: function(iterador, lista) {
        console.log(
            `${String(parseInt(iterador) + 1).padStart(2)} ` +
            `${(lista[iterador].marca).padEnd(21)} ` +
            `${(lista[iterador].nome).padEnd(20)} ` +
            `${lista[iterador].preco.toLocaleString("pt-br", {
            minimumFractionDigits: 2})}`.padEnd(10) +
            `${lista[iterador].quantidade} unidade(s)`.padStart(11)
        );
    }, 
    
    desejaSair: function() {
        if (prompt("(Insira qualquer caractere para sair)") != '*') {
            return true;
        }
    }, 
    
    deseja: function(mensagem) {
        if (prompt("Deseja " + mensagem + " (S|N): ").toLowerCase() == 's') {
            return true;
        } else {
            return false;
        }
    }, 
};
