import { Funcionario } from "./Funcionario";

export class FuncionarioAdministrativo extends Funcionario {
  constructor(private _setor: string = "setor") {
    super();
  };
}
