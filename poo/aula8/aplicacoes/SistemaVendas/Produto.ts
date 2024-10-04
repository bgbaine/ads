export default class Produto {
    constructor(
        private nome: string,
        private preco: number,
        private estoque: number
    ) {}

    public get Nome(): string {
        return this.nome;
    }

    public get Preco(): number {
        return this.preco;
    }

    public get Estoque(): number {
        return this.estoque;
    }

    public vender(quantidade: number): boolean {
        return this.estoque >= quantidade;
    }

    public calcularPrecoComDesconto(descontoEmPercentual: number): number {
        return this.preco - (this.preco * (descontoEmPercentual / 100));
    }
}