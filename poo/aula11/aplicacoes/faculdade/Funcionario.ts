import { Pessoa } from "./Pessoa";

export class Funcionario extends Pessoa {
  constructor(protected salario: number = 1_000) {
    super();
  };
}
