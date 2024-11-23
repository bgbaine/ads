export class Personagem {
  constructor(
    protected _nome: string = '0',
    protected _forca: number = 0,
    protected _habilidadeMental: number = 0,
    protected _ataque: number = 0,
    protected _esquiva: number = 0,
    protected _resistencia: number = 0,
    protected _vidaAtual: number = 0,
    protected _vidaMaxima: number = 0,
  ) {}

  public atacar(personagem: Personagem): void {
    console.log("personagem atacando");
  }

  public contraAtacar(personagem: Personagem): void {
    console.log("personagem contra-atacando");
  }

  public aprimorarHabilidade(): void {
    console.log("personagem aprimorando habilidade");
  }

  public regenerarVida(): void {
    console.log("personagem regenerando vida");
  }

  get nome() {
    return this._nome;
  }

  get esquiva() {
    return this._esquiva;
  }

  get vidaAtual() {
    return this._vidaAtual;
  }

  set vidaAtual(novaVida: number) {
    this._vidaAtual = novaVida;
  }

  get resistencia() {
    return this._resistencia;
  }
}
