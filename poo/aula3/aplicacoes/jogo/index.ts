import { Personagem } from "./personagem";
import prompt from 'prompt-sync';

const teclado = prompt();

const nome = teclado("Digite o nome do heroi: ");
const heroi: Personagem = new Personagem(nome);

heroi.raca = teclado("Digite a raca do heroi: ");
heroi.classe = teclado("Digite a classe do heroi: ");

if (heroi.nome === "Edecio") {
    heroi.ataque = 100;
    heroi.defesa = 100;
    heroi.vida = 1000;
    heroi.mana = 1000;
    heroi.intelecto = 100;
    heroi.armadura = 100;
    heroi.vitalidade = 100;
    heroi.nivel = 10;
}

while (true) {
    console.log('============== MENU ==============');
    console.log("1 - Treinar ataque");
    console.log("2 - Treinar defesa");
    console.log("3 - Treinar intelecto");
    console.log("4 - Descansar");
    console.log("5 - Lutar");
    console.log("6 - Status");
    console.log("0 - Sair");

    const opcao: number = +teclado("Escolha uma opcao: ");
    if (opcao === 0) {
        break;
    }

    let horas: number = 0;

    switch (opcao) {
        case 1:
            horas = +teclado("Digite o numero de horas do treino: ")
            heroi.treinar("ataque", horas);
            horas = 0;
            break;
        case 2:
            horas = +teclado("Digite o numero de horas do treino: ")
            heroi.treinar("defesa", horas);
            horas = 0;
            break;
        case 3:
            horas = +teclado("Digite o numero de horas do treino: ")
            heroi.treinar("intelecto", horas);
            horas = 0;
            break;
        case 4:
            horas = +teclado("Digite o numero de horas de descanso: ")
            heroi.descansar(horas);
            horas = 0;
            break;
        case 5:
            heroi.lutar();
            break;
        case 6:
            console.table(heroi );
            break;
        default:
            break;
    }
}
