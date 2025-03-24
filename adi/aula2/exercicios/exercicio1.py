def main():
    senha: str = input("Digite a senha: ")

    if len(senha) < 8 or len(senha) > 12:
        print("Senha inválida")
        return

    maiuscula: bool = False
    minuscula: bool = False
    numero: bool = False

    for c in senha:
        if c.isupper():
            maiuscula = True
        if c.islower():
            minuscula = True
        if c.isdigit():
            numero = True

    if maiuscula and minuscula and numero:
        print("Senha Válida")
        return
    else:
        print("Senha Inválida")
        return


if __name__ == "__main__":
    main()
