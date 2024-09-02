import Util from "./Util";

export class Personagem {
    nome: string;
    nivel: number;
    vida: number;
    ataque: number;
    defesa: number;
    raca: string;
    classe: string;
    vitalidade: number;
    mana: number;
    intelecto: number;
    armadura: number;
    esquiva: number;

    ATAQUE_MAX: number = 100;
    DEFESA_MAX: number = 100;
    INTELECTO_MAX: number = 100;

    constructor(nome: string) {
        this.nome = nome;
        this.ataque = Util.randomizar(10, 100);
        this.defesa = Util.randomizar(10, 100);
        this.vida = Util.randomizar(100, 1000);
        this.mana = Util.randomizar(100, 1000);
        this.intelecto = Util.randomizar(10, 100);
        this.armadura = Util.randomizar(10, 100);
        this.vitalidade = Util.randomizar(10, 100);
        this.nivel = Util.randomizar(1, 10);
        this.raca = '';
        this.classe = '';
        this.esquiva = Util.randomizar(10, 100);
    }

    treinar(atributo: 'ataque' | 'defesa' | 'intelecto', tempoTreinoHoras: number): void {
        if (this[atributo] + tempoTreinoHoras)
        this[atributo] += tempoTreinoHoras * Util.randomizar(1, 10);
        this.vitalidade -= tempoTreinoHoras * Util.randomizar(1, 10);
    
        if (this.vitalidade < 0) {
            throw new Error("O heroi morreu!");
        }
    }

    descansar(tempoDescansoHoras: number): void {
        if (tempoDescansoHoras > 5) {
            this.vitalidade += 5;
        } else {
            this.vitalidade += tempoDescansoHoras;
        }
    }

    private atacar(): void {

    }

    private defender(): void {

    }

    lutar(): void {
        const inimigo: Personagem = new Personagem("Inimigo");

        while (this.vida > 0 && inimigo.vida > 0) {
            /* 
                nivel;
                ataque;
                intelecto;
                esquiva; 
                vitalidade;
                
                defesa;
                armadura;
            */

            if (this.vida < 0) {
                throw new Error("O heroi morreu!");
            }

            this.vitalidade = Util.randomizar(1, 5);
            inimigo.vitalidade = Util.randomizar(1, 5);
        }
        console.log("Seu heroi venceu!");
    }
}
