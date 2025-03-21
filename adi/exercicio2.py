def main():
    numero: int = int(input("Número: "))
    divisores: list = []

    for i in range(numero // 2, 0, -1):
        if numero % i == 0:
            divisores.append(i)

    print(f"Divisores do {numero}: ", end="")
    divisores.reverse()

    print(", ".join(map(str, divisores)))

    soma_divisores: int = sum(divisores)
    print(f"Soma dos divisores: {soma_divisores}")

    print(f"Portanto, {numero} ", end="")
    print("não é ", end="") if soma_divisores != numero else print("é ", end="")
    print("um número perfeito")


if __name__ == "__main__":
    main()
