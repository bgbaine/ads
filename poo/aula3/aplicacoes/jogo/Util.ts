import prompt from 'prompt-sync';

const teclado = prompt();

export default class Util {
    static randomizar(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static teclado(mensagem: string): string {
        return teclado(mensagem);
    }
}
