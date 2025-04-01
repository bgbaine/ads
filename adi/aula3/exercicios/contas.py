descricoes: list[str] = []
valores: list[str] = []


def incluir_conta(descricao: str, valor: str) -> None:
    descricoes.append(descricao)
    valores.append(valor)
    print("Conta incluída com sucesso!\n\n\n")


def listar_contas(ordenar: bool = False) -> None:
    if not descricoes or not valores:
        print("Nenhuma conta cadastrada.\n\n\n")
        return

    if ordenar:
        contas: list[tuple[str, str]] = sorted(
            zip(descricoes, valores), key=lambda x: x[0]
        )
    else:
        contas: list[tuple[str, str]] = list(zip(descricoes, valores))
    
    print("\n\n\n")


def pesquisar_conta(descricao: str) -> None:
    if descricao in descricoes:
        index: int = descricoes.index(descricao)
        print(f"Descrição: {descricoes[index]}, Valor: {valores[index]}\n\n\n")
    else:
        print("Conta não encontrada.\n\n\n")


def excluir_conta(descricao: str) -> None:
    if descricao in descricoes:
        index: int = descricoes.index(descricao)
        del descricoes[index]
        del valores[index]
        print("Conta excluída com sucesso!\n\n\n")
    else:
        print("Conta não encontrada.\n\n\n")


def main():
    while True:
        print("1. Incluir Conta")
        print("2. Listar Contas")
        print("3. Listar Contas em Ordem")
        print("4. Pesquisar Conta")
        print("5. Excluir Conta")
        print("6. Finalizar")
        opcao: str = input("Escolha uma opção: ").strip()

        match opcao:
            case "6":
                print("Saindo...")
                break
            case "1":
                descricao: str = input("Descrição da conta: ").strip()
                valor: str = input("Valor da conta: ").strip()
                incluir_conta(descricao, valor)
            case "2":
                listar_contas()
            case "3":
                listar_contas(True)
            case "4":
                pesquisar_conta(input("Descrição da conta: ").strip())
            case "5":
                excluir_conta(input("Descrição da conta: ").strip())


if __name__ == "__main__":
    main()
