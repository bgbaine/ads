import ContaBancaria from "./ContaBancaria";

const contaBancaria: ContaBancaria = new ContaBancaria('123456');

console.log(contaBancaria.consultarSaldo());
contaBancaria.depositar(500);
console.log(contaBancaria.consultarSaldo());
contaBancaria.depositar(-5);
contaBancaria.sacar(200);
console.log(contaBancaria.consultarSaldo());
contaBancaria.sacar(100);
console.log(contaBancaria.consultarSaldo());
contaBancaria.sacar(1000);
console.log(contaBancaria.consultarSaldo());
contaBancaria.sacar(201);
console.log(contaBancaria.consultarSaldo());
