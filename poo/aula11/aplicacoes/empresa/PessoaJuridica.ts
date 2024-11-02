import { Pessoa } from "./Pessoa";

export class PessoaJuridica extends Pessoa {
  constructor(private _cnpj: string) {
    super();
  }
}
