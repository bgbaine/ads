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

    private static ATAQUE_MAX: number = 100;
    private static DEFESA_MAX: number = 100;
    private static INTELECTO_MAX: number = 100;
    private static VITALIDADE_MAX: number = 1000;

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
        if (tempoTreinoHoras > 5) {
            this[atributo] += 5 * Util.randomizar(1, 10);
            this.vitalidade -= 5 * Util.randomizar(1, 10);
        } else {
            this[atributo] += tempoTreinoHoras * Util.randomizar(1, 10);
            this.vitalidade -= tempoTreinoHoras * Util.randomizar(1, 10);
        }
    
        if (this.vitalidade < 1) {
            throw new Error("O heroi morreu!");
        }
    }

    descansar(tempoDescansoHoras: number): void {
        if (tempoDescansoHoras > 5) {
            this.vitalidade += 5;
        } else {
            this.vitalidade += tempoDescansoHoras;
        }
        if (this.vitalidade > Personagem.VITALIDADE_MAX) {
            this.vitalidade = Personagem.VITALIDADE_MAX;
        }
    }

    private atacar(inimigo: Personagem): void {
        const ataqueHeroi = this.ataque + (this.intelecto / 2) + (this.nivel / 2);
        const defesaHeroi = this.defesa + this.armadura;
        const defesaEfetivaHeroi = Util.randomizar(defesaHeroi * 0.5, defesaHeroi);
        
        const ataqueInimigo = inimigo.ataque + (inimigo.intelecto / 2) + (inimigo.nivel / 2);
        const ataqueEfetivoInimigo = Util.randomizar(ataqueInimigo * 0.5, ataqueInimigo * 0.8);
        const defesaInimigo = inimigo.defesa + inimigo.armadura;
        const defesaEfetivaInimigo = Util.randomizar(defesaInimigo * 0.2,defesaInimigo * 0.8);
    
        let danoHeroi = ataqueHeroi - defesaEfetivaInimigo;
        let danoInimigo = ataqueEfetivoInimigo - defesaEfetivaHeroi;

        danoHeroi > 0 ? inimigo.vida -= danoHeroi : danoHeroi = 0;
        danoInimigo > 0 ? this.vida -= danoInimigo : danoInimigo = 0;
        
        console.log(`Dano causado pelo heroi: ${danoHeroi}`);
        console.log(`Dano causado pelo contra-ataque inimigo: ${danoInimigo}`);
        
    
        inimigo.vida -= danoHeroi;
        this.vida -= danoInimigo;
        
        this.vitalidade = Util.randomizar(this.vitalidade * 0.1, this.vitalidade * 0.3);
    }
    
    private defender(inimigo: Personagem): void {
        const ataqueInimigo = inimigo.ataque + (inimigo.intelecto / 2) + (inimigo.nivel / 2);
        const defesaInimigo = inimigo.defesa + inimigo.armadura;
        const defesaEfetivaInimigo = Util.randomizar(defesaInimigo * 0.5, defesaInimigo);
        
        const ataqueHeroi = this.ataque + (this.intelecto / 2) + (this.nivel / 2);
        const ataqueEfetivoHeroi = Util.randomizar(ataqueHeroi * 0.5, ataqueHeroi * 0.8);
        const defesaHeroi = this.defesa + this.armadura;
        const defesaEfetivaHeroi = Util.randomizar(defesaHeroi * 0.2, defesaHeroi * 0.8);
        
        let danoInimigo = ataqueInimigo - defesaEfetivaHeroi;
        let danoHeroi = ataqueEfetivoHeroi - defesaEfetivaInimigo;
        
        danoInimigo > 0 ? this.vida -= danoInimigo : danoInimigo = 0;
        danoHeroi > 0 ? inimigo.vida -= danoHeroi : danoHeroi = 0;
    
        console.log(`Dano causado pelo inimigo: ${danoInimigo}`);
        console.log(`Dano causado pelo contra-ataque heroi: ${danoHeroi}`);

        inimigo.vitalidade = Util.randomizar(inimigo.vitalidade * 0.1, inimigo.vitalidade * 0.3);
    }

    lutar(): void {
        const inimigo: Personagem = new Personagem("Inimigo");
        
        while (this.vida > 0 && inimigo.vida > 0) {
            console.log('============== BATALHA ==============');
            console.log(`Heroi: ${this.nome} - Vida: ${this.vida}`);
            console.log(`Inimigo: ${inimigo.nome} - Vida: ${inimigo.vida}`);
            console.log('============== ACAO ==============');
            console.log("1 - Atacar");
            console.log("2 - Defender");

            const acao: number = +Util.teclado("Escolha uma opcao: ");

            switch (acao) {
                case 1:
                    this.atacar(inimigo);
                    break;
                case 100:
                    return;
                default:
                    this.defender(inimigo);
                    break;
            }

            if (this.vida < 0) {
                throw new Error("O heroi morreu!");
            }
        }
        console.log("Seu heroi venceu!");
    }
}
