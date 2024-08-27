const fs = require("fs");
const p = require("../core/Produto");
const aux = require("./auxiliary");

// ------------------------------------------------  Funções de entrada e saída

module.exports = {
    carregaDados: function(lista) {
        if (fs.existsSync("data/produtos.txt")) {
            const banco = fs.readFileSync(
                "data/produtos.txt",
                "utf-8").split("\n");
            
            for (let i in banco) {
                const partes = banco[i].split(';');
    
                const produto = new p.Produto();
    
                produto.marca = partes[0];
                produto.nome = partes[1];
                produto.preco = Number(partes[2]);
                produto.quantidade = Number(partes[3]);
    
                lista.push(produto);
            }
        }
    },
    
    gravaDados: function(lista) {
        if (aux.estaVazia(lista)) {
            return 1;
        }
    
        const banco = [];
    
        for (let i in lista) {
            banco.push(
                lista[i].marca + 
                ';' + 
                lista[i].nome + 
                ';' + 
                lista[i].preco + 
                ';' + 
                lista[i].quantidade
            )
        }
    
        fs.writeFileSync("data/produtos.txt", banco.join("\n"));
    
        console.log("\nDados salvos em arquivo...");
    }
};
