import random
import time
import os

temp: str = "🐯🐯🐺🐺🐷🐷🐮🐮🐻🐻🐸🐸🦄🦄🐔🐔"
figuras: list[str] = list(temp)

jogo: list = []
apostas: list = []


def preenche_matriz() -> None:
    for i in range(4):
        jogo.append([])
        apostas.append([])
        for _ in range(4):
            num = random.randint(0, len(figuras) - 1)
            jogo[i].append(figuras[num])
            apostas[i].append("🟥")
            figuras.pop(num)


def mostra_tabuleiro() -> None:
    os.system("cls")
    print("   1   2   3   4")
    for i in range(4):
        print(f"{i + 1}", end="")
        for j in range(4):
            print(f" {jogo[i][j]} ", end="")
        print("\n")

    print("Memorize a posicao dos bichos...")
    time.sleep(2)

    print("Contagem regressiva: ", end="")
    for i in range(10, 0, -1):
        print(i, end=" ", flush=True)
        time.sleep(1)

    os.system("cls")


def mostra_cartas_e_acertos() -> None:
    os.system("cls")
    print("   1   2   3   4")
    for i in range(4):
        print(f"{i + 1}", end="")
        for j in range(4):
            print(f" {apostas[i][j]} ", end="")
        print("\n")


def aposta_coordenada(num: int) -> None:
    while True:
        mostra_cartas_e_acertos()
        posicao: int = input(f"{num}ª  Coordenada (2 numeros: linha e coluna): ")
        if len(posicao) != 2:
            print("Informe uma dezena, por exemplo, 12, 23, 31, etc")
            time.sleep(2)
            continue
        x: int = int(posicao[0]) - 1
        y: int = int(posicao[1]) - 1
        try:
            if apostas[x][y] == "🟥":
                apostas[x][y] = jogo[x][y]
                break
            else:
                print("Coordenada ja apostada...")
                time.sleep(2)
        except IndexError:
            print("Erro... Coordenada invalida")
            time.sleep(2)

    return x, y


def verifica_vencedor() -> int:
    contador: int = 0
    for i in range(4):
        for j in range(4):
            if apostas[i][j] == "🟥":
                contador += 1
    return contador


def main():
    preenche_matriz()
    mostra_tabuleiro()
    while True:
        x1, y1 = aposta_coordenada(1)
        x2, y2 = aposta_coordenada(2)
        mostra_cartas_e_acertos()

        if apostas[x1][y1] == apostas[x2][y2]:
            print("Parabens! Voce acertou! 🫡")
            cartas_viradas: int = verifica_vencedor()
            if cartas_viradas == 0:
                print("Parabens! Voce venceu!")
            else:
                print(f"Falta(m) {cartas_viradas // 2} bichos para descobrir")
                time.sleep(2)
        else:
            print("Errou... Tente novamente. ")
            apostas[x1][y1] = "🟥"
            apostas[x2][y2] = "🟥"

            continuar: str = input("Deseja continuar (S/N): ").upper()
            if continuar != "S":
                break


if __name__ == "__main__":
    main()
