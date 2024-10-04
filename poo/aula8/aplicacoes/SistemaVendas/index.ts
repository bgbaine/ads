import Produto from "./Produto";

const produto: Produto = new Produto("Produto 1", 100, 10);

console.log(produto.Nome);
console.log(produto.Preco);
console.log(produto.Estoque);
console.log(produto.vender(5));
console.log(produto.vender(10));
console.log(produto.vender(11));
console.log(produto.calcularPrecoComDesconto(10));
console.log(produto.calcularPrecoComDesconto(50));
