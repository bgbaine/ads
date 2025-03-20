def main():
    numero: int = int(input("Número: "))
    divisores: list = []

    for i in range(numero, 1, -1):
        if numero % i == 0:
            divisores.append(i)

    print(divisores)


if __name__ == "__main__":
    main()
