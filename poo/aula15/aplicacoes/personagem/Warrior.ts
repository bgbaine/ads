import { Personagem } from "./Personagem";
import { Utils } from "./Utils/Utils";

export class Warrior extends Personagem {
  constructor(nome: string) {
    super(
      (nome = nome + " Warrior"),
      Utils.randomizar(1, 1000),
      0,
      0,
      Utils.randomizar(0, 50),
      Utils.randomizar(0, 90),
      0,
      Utils.randomizar(1, 40_000)
    );
    this._ataque = this._forca * 10;
    this.vidaAtual = this._vidaMaxima;
  }

  private ataque(personagem: Personagem): void {
    if (Utils.randomizar(1, 100) < personagem.esquiva) {
      console.log("\n\n\nerou ataque\n\n");
      return;
    }

    const danoCausado: number =
      (1 - personagem.resistencia / 100) * this._ataque;
    personagem.vidaAtual -= danoCausado;

    const oponenteMorreu: boolean = personagem.vidaAtual <= 0;
    if (oponenteMorreu) {
      throw new Error(`${personagem.nome} foi derrotado`);
    }
  }

  public atacar(personagem: Personagem): void {
    console.log(`\n\n${this.nome} atacou ${personagem.nome}\n\n`);

    this.ataque(personagem);
    personagem.contraAtacar(this);
  }

  public contraAtacar(personagem: Personagem): void {
    console.log(`\n\n${personagem.nome} contra-atacou ${this.nome}\n\n`);
    personagem.atacar(this);
  }

  public aprimorarHabilidade(): void {
    this._forca += this._forca * 0.1;
    console.log("\n\n\nforca aprimorada\n\n");
  }

  public regenerarVida(): void {
    this.vidaAtual += this.vidaAtual * 0.05;
    console.log("\n\n\nvida regenerada\n\n");
  }
}
