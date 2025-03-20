def main():
    pessoas: int = int(input("Nº Pessoas: "))
    peixes: int = int(input("Nº Peixes: "))

    total: int = 0

    diferenca = peixes - pessoas
    if diferenca > 0:
        total += diferenca * 12
        peixes -= diferenca

    for i in range(peixes):
        total += 20

    print(f"Pagar R$: {total:.2f}")


if __name__ == "__main__":
    main()
