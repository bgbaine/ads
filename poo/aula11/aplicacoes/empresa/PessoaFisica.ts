import { Pessoa } from "./Pessoa";

export class PessoaFisica extends Pessoa {
  constructor(
    private _cpf: string = "pessoafisica_cpf",
    private _dataUltimoAcesso: number = new Date().getDate()
  ) {
    super();
  }
}
