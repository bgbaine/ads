import requests


URL_API: str = "http://localhost:3000/vinhos"


def titulo(texto: str):
    print()
    print("=" * 40)


def incluir():
    titulo("Inclusao de Vinhos")
    marca: str = input("Marca do Vinho: ")
    tipo: str = input("Tipo..........: ")
    quantidade: int = int(input("Quantidade..........: "))
    preco: float = float(input("Preco R$..........: "))

    res = requests.post(
        URL_API,
        json={"marca": marca, "tipo": tipo, "quantidade": quantidade, "preco": preco},
    )

    if res.status_code == 201:
        vinhos = res.json()
        print(f"Vinho cadastrado com sucesso! - Codigo: {vinhos['id']}")
    else:
        print(f"Erro ao cadastrar vinho: {res.status_code} - {res.text}")


def listar():
    titulo("Lista de vinhos cadastrados")

    res = requests.get(URL_API)
    if res.status_code != 200:
        print(f"Erro ao consultar vinhos: {res.status_code} - {res.text}")
        return

    vinhos = res.json()

    print("Cod:  Marca do Vinho.......: Tipo...........: Qtd: Preco R$:")
    print("-" * 60)
    for vinho in sorted(vinhos, key=lambda x: x['marca']):
        print(
            f"{vinho['id']}: {vinho['marca']:20s} {vinho['tipo']:15s} {vinho['quantidade']:3d} {float(vinho['preco']):9.2f}"
        )


while True:
    titulo("Cadastro Pessoal de Vinhos")
    print("1 - Inclusao")
    print("2 - Listagem")
    print("3 - Alteracao")
    print("4 - Exclusao")
    print("5 - Finalizar")

    try:
        opcao = int(input("Digite a opcao desejada: "))
    except ValueError:
        print("Opcao invalida. Tente novamente.")
        continue

    match opcao:
        case 1:
            incluir()
        case 2:
            listar()
        case _:
            break
