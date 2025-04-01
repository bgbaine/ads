import random
import time
import sys

naipes: str = "♠♣♥♦"
extras: str = "JQKA"
baralho: list = [str]


def monta_baralho() -> None:
    for i in range(2, 11):
        for naipe in naipes:
            baralho.append(str(i) + naipe)

    for extra in extras:
        for naipe in naipes:
            baralho.append(extra + naipe)


def pontos_carta(carta: str) -> int:
    if len(carta) == 3:
        return 10
    elif carta[0].isdigit():
        return int(carta[0])
    else:
        return 11 if carta[0] == "A" else 10


def main():
    monta_baralho()

    pontos_jogador: int = 0
    contador: int = 0
    while True:
        contador += 1
        num: int = random.randint(0, len(baralho) - 1)
        carta: str = baralho.pop(num)
        pontos_jogador += pontos_carta(carta)

        print(f"Sua {contador}ª carta é {carta}")
        time.sleep(2)

        if pontos_jogador > 21:
            break

        if contador >= 2:
            outra: str = input("Deseja outra carta? (s/n) ").strip().lower()
            if outra == "n":
                break

    print()
    print("=" * 40)
    print(f"Total de Pontos do Jogador: {pontos_jogador}")
    print("=" * 40)

    if pontos_jogador > 21:
        print("Você perdeu!")
        sys.exit(1)

    pontos_pc: int = 0
    contador: int = 0
    while True:
        contador += 1
        num: int = random.randint(0, len(baralho) - 1)
        carta: str = baralho.pop(num)
        pontos_pc += pontos_carta(carta)

        print(f"{contador}ª carta do PC é {carta}")
        time.sleep(2)

        if pontos_pc > 21 or pontos_pc >= pontos_jogador:
            break

    print()
    print("=" * 40)
    print(f"Total de Pontos do PC: {pontos_pc}")
    print("=" * 40)

    print()
    if pontos_pc > 21:
        print("Você ganhou!")
    elif pontos_pc == pontos_jogador:
        print("Empate!")
    else:
        print("Você perdeu!")


if __name__ == "__main__":
    main()
