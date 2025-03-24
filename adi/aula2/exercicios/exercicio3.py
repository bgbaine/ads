def main():
    palavra: str = input("Palavra: ")

    for c in palavra:
        (
            print(c.upper(), end="")
            if c.lower() == palavra[0].lower()
            else print("_", end="")
        )


if __name__ == "__main__":
    main()
