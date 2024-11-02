import { Funcionario } from "./Funcionario";

export class FuncionarioProfessor extends Funcionario {
  constructor(private _titulacao: string = "titulacao") {
    super();
  };
}
