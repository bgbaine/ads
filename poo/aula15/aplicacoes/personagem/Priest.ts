import { Personagem } from "./Personagem";
import { Utils } from "./Utils/Utils";

export class Priest extends Personagem {
  constructor(nome: string) {
    super(
      (nome = nome + " Priest"),
      0,
      0,
      0,
      0,
      0,
      0,
      Utils.randomizar(1, 8_000)
    );
    this._vidaAtual = this._vidaMaxima;
  }

  private ataque(personagem: Personagem): void {
    const acertou = Utils.randomizar(0, 100) < 40;
    if (acertou) {
      personagem.vidaAtual = 0;
      throw new Error(`${personagem.nome} foi convertido`);
    }

    console.log("\n\n\nnao conseguiu converter\n\n");
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
    throw new Error("Este personagem não pode executar esta ação");
  }

  public regenerarVida(): void {
    this.vidaAtual += this.vidaAtual * 0.1;
    console.log("\n\n\nvida regenerada\n\n");
  }
}
