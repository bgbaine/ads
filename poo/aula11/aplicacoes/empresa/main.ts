import { Funcionario } from "./Funcionario";
import { Pessoa } from "./Pessoa";
import { PessoaFisica } from "./PessoaFisica";
import { PessoaJuridica } from "./PessoaJuridica";

const pessoa: Pessoa = new Pessoa();
const pessoaFisica: PessoaFisica = new PessoaFisica();
const funcionario: Funcionario = new Funcionario();
const pessoaJuridica: PessoaJuridica = new PessoaJuridica("cpnj");

console.log(pessoa);
console.log(pessoaFisica);
console.log(funcionario);
console.log(pessoaJuridica);
