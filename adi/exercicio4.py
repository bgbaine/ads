def main():
    numero: int = int(input("Número de Chinchilas: "))
    anos: int = int(input("Anos de criação: "))

    for i, _ in enumerate(range(anos), 1):
        print(f"{i}º Ano: {numero}")
        numero *= 3


if __name__ == "__main__":
    main()