import { Pessoa } from "./Pessoa";

export class Aluno extends Pessoa {
  constructor(private _turma: string = "turma") {
    super();
  };
}
