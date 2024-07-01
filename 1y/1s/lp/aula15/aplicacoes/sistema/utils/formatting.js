// -----------------------------------------------------  Funções de formatação

module.exports = {
    limpaTela: function() {
        console.log('\n'.repeat(50));
    }, 
    
    imprimeTitulo: function(titulo, simbolo='-', tamanho=70) {
        console.log(`\n${titulo}\n${simbolo.repeat(tamanho)}`);
    }, 
    
    imprimeCabecalho: function(simbolo='=', tamanho='70') {
        console.log(
            "Nº Marca...............: " +
            "Nome...............: " +
            "Preço R$: Quantidade...:"
        );
        console.log(simbolo.repeat(tamanho));
    }
};
