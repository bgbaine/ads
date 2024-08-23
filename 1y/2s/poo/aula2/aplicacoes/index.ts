import { Personagem } from "./personagem";
import prompt from 'prompt-sync';

const teclado = prompt();

const heroi: Personagem = new Personagem();

heroi.nome = teclado("Digite o nome do heroi: ");
heroi.raca = teclado("Digite a raca do heroi: ");
heroi.classe = teclado("Digite a classe do heroi: ");
heroi.ataque = 10 + Math.random() * 90;
heroi.defesa = 10 + Math.random() * 90;
heroi.vida = 100 + Math.random() * 900;
heroi.mana = 100 + Math.random() * 900;
heroi.intelecto = 10 + Math.random() * 90;
heroi.armadura = 10 + Math.random() * 90;
heroi.vitalidade = 10 + Math.random() * 90;
heroi.nivel = 1 + Math.random() * 9;

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
    console.log("5 - Status");
    console.log("0 - Sair");

    const opcao: number = +teclado("Escolha uma opcao: ");
    if (opcao === 0) {
        break;
    }

    switch (opcao) {
        case 1:
            const numeroHoras: number = +teclado("Digite o numero de horas do treino: ")
            treinarAtaque(heroi, numeroHoras);
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        case 5:
            console.table(heroi);
            break;
    
        default:
            break;
    }
}

function treinarAtaque(heroi: Personagem, tempoTreinoHoras: number): void {
    heroi.ataque += tempoTreinoHoras * Math.random() * 10;
    heroi.vitalidade -= tempoTreinoHoras * Math.random() * 10;

    if (heroi.vitalidade < 0) {
        throw new Error("O heroi morreu!");
    }
}
