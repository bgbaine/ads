import random
import time

nome = input("Digite seu nome: ")
valor = float(input("Digite o valor da aposta: "))

input("\nPressione ENTER para iniciar o jogo...\n")

figuras = "🥥🍇🍉"
jogo = ""

print("Suas apostas: ", end="")

for _ in range(3):
    num = random.randint(0, 2)
    print(figuras[num], end="", flush=True)