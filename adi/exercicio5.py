def main():
    contador: int = 0
    soma: int = 0
    maior: int = 0
    numero: int = 1

    print("Informe números ou 0 para sair")

    while numero != 0:
        numero = int(input("Número: "))

        if numero != 0:
            contador += 1
            soma += numero

        maior = numero if numero > maior else maior

    print("-" * 30)
    print(f"Números digitados: {contador}")
    print(f"Soma dos Números: {soma}")
    print(f"Maior Número: {maior}")


if __name__ == "__main__":
    main()
