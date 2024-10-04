export default class ContaBancaria {
    private saldo = 1_000;

    constructor (
        private numeroConta: string = '1'
    ) {}

    public depositar(valor: number): void {
        if (valor <= 0) {
            console.log('Deposito invalido');
            return;
        }
        this.saldo += valor;
    }

    public sacar(valor: number): void {
        this.saldo - valor > 0 ? this.saldo -= valor : console.log('Saldo insuficiente');
    }

    public consultarSaldo(): number {
        return this.saldo;
    }
}