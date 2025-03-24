import random
import time


def main():
    primeira_jogada: bool = True
    alvo: int = 0
    
    while True:
        input("\nPressione ENTER para jogar os dados...\n")
        time.sleep(4)
        dado1: int = random.randint(1, 6)
        dado2: int = random.randint(1, 6)
        soma: int = dado1 + dado2

        if not primeira_jogada:
            if soma == 7:
                print(f"Você tirou {soma} e PERDEU!")
                return

            if soma == alvo:
                print(f"Você tirou {soma} e GANHOU!")
                return

            print(f"Você tirou {soma}, vamos continuar jogando...")
        else:
            alvo = dado1 + dado2
            if alvo == 2 or alvo == 3 or alvo == 12:
                print(f"CRAPS! Você tirou {alvo} e PERDEU!")
                return

            if alvo == 7 or alvo == 11:
                print(f"Você tirou {alvo} e GANHOU!")
                return

            print(f"PONTO! Você tirou {alvo}, vamos continuar jogando...")
            primeira_jogada = False


if __name__ == "__main__":
    main()
