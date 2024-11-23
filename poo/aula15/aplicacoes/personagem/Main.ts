import { Personagem } from "./Personagem";
import { Warrior } from "./Warrior";
import { Priest } from "./Priest";

const personagem: Personagem = new Personagem("Mr. m");
const warrior: Warrior = new Warrior("Ragnar");
const priest: Priest = new Priest("Fabio de Melo");

console.log(warrior);
console.log(priest);

priest.atacar(warrior);

console.log(warrior);
console.log(priest);

priest.atacar(warrior);

console.log(warrior);
console.log(priest);

