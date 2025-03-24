def main():
    nome: str = input("Nome Completo: ")
    nomes: list = nome.split(" ")

    if len(nomes) < 2:
        print("Ops... Por favor, digite o nome completo")
        return

    print(f"Nome no Crachá: {nomes[0].upper()}")


if __name__ == "__main__":
    main()
