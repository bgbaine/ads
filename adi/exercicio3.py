def main():
    nome: str = input("Produto: ")
    etiquetas: int = int(input("Nº de Etiquetas: "))

    while etiquetas > 0:
        print(f"{nome}", end="")

        print(f"    {nome}") if etiquetas > 1 else None
        etiquetas -= 2


if __name__ == "__main__":
    main()
