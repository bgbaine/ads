# Repetições com while
continua = "S"
while continua == "S":
    print("Olá")
    continua = input("Deseja Continuar: ").upper()

# repetições com saída a partir do break
while True:
    print("Oi... Tudo bem!?")
    continua = input("Continuar? ").upper()
    if continua == "N":
        break
    