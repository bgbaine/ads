import { PessoaFisica } from "./PessoaFisica";

export class Funcionario extends PessoaFisica {
  constructor(private _dataAdmissao: number = new Date().getDate()) {
    super();
  }
}
