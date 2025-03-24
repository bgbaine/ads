def main():
    palavra: str = input("Palavra: ")

    for i in range(len(palavra)):
        if palavra[i] != palavra[-1 - i]:
            print(f"{palavra} não é palíndrome")
            return
    print(f"{palavra} é Palíndrome")


if __name__ == "__main__":
    main()
