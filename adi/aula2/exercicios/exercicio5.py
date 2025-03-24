def main():
    email: str = input("E-mail: ")

    if email.count("@") < 1 or email.count(" ") > 0:
        print("E-mail inválido")
        return

    partes_email = email.split("@")

    if partes_email[1].count(".") < 1:
        print("E-mail inválido")
        return
    
    print("Ok! E-mail em formato válido.")


if __name__ == "__main__":
    main()
