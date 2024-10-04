import Produto from './Produto';

describe('Testando a classe Produto', () => {
    let produto: Produto;

    beforeEach(() => {
        produto = new Produto('Produto A', 100, 50);
    });

    describe('Testando o metodo vender', () => {
        it('deve retornar verdadeiro se existe estoque disponivel', () => {
            expect(produto.vender(30)).toBe(true);
        });

        it('deve retornar falso caso nao exista estoque disponivel', () => {
            expect(produto.vender(60)).toBe(false);
        });

        it('deve retornar verdadeiro se a quantidade vendida for exatamente igual a quantidade em estoque', () => {
            expect(produto.vender(50)).toBe(true);
        });
    });

    describe('Testando o metodo calcularPrecoComDesconto', () => {
        it('deve retornar o preco subtraido de 10% desconto', () => {
            expect(produto.calcularPrecoComDesconto(10)).toBe(90);
        });
        
        it('deve retornar o preco subtraido de 50% desconto', () => {
            expect(produto.calcularPrecoComDesconto(50)).toBe(50);
        });

        it('deve retornar o preco original se o desconto for de 0%', () => {
            expect(produto.calcularPrecoComDesconto(0)).toBe(100);
        });

        it('deve retornar 0 se o desconto for de 100%', () => {
            expect(produto.calcularPrecoComDesconto(100)).toBe(0);
        });
    });
});
