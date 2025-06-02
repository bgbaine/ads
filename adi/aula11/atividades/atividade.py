import csv
import locale

# Configuração regional para exibição de números e moedas
locale.setlocale(locale.LC_ALL, "pt_BR.UTF-8")

# Carregar o dataset
pacientes = []
with open("china_cancer_patients_synthetic.csv", mode="r") as arq:
    dados_csv = csv.DictReader(arq)
    for linha in dados_csv:
        pacientes.append(linha)


def titulo(texto):
    print("\n" * 40)
    print(texto)
    print("-" * 40)


def confirmar():
    input("\nPressione ENTER para continuar")


def agrupar_por_tipo_tumor():
    titulo("5 Tipos de Tumor Mais Comuns")
    grupos = {}
    for paciente in pacientes:
        tipo_tumor = paciente["TumorType"]
        grupos[tipo_tumor] = grupos.get(tipo_tumor, 0) + 1

    # Ordenar os grupos por número de pacientes
    grupos_ordenados = sorted(grupos.items(), key=lambda x: x[1], reverse=True)

    print("Nº Tipo de Tumor..................: Nº Pacientes")
    for num, (tipo, qtd) in enumerate(grupos_ordenados[:10], start=1):
        print(f"{num:2d} {tipo:25s} {qtd:>10d}")
        if num == 5:
            break

    confirmar()


def ordenar_por_idade():
    titulo("10 Pacientes Mais Jovens e Mais Idosos")
    pacientes_ordenados = sorted(pacientes, key=lambda p: int(p["Age"]))
    print("Nº ID do Paciente...........: Idade.:")
    print("---------------------------------------------------------")

    for num, paciente in enumerate(pacientes_ordenados[:10], start=1):
        print(f"{num:2d} {paciente['PatientID']:25s} {paciente['Age']} anos")
    print("\n10 Pacientes Mais Idosos")
    print("Nº ID do Paciente...........: Idade.:")
    print("---------------------------------------------------------")

    for num, paciente in enumerate(pacientes_ordenados[-10:], start=1):
        print(f"{num:2d} {paciente['PatientID']:25s} {paciente['Age']} anos")

    confirmar()


def comparar_metastase():
    titulo("Média de Idade por Metástase")
    com_metastase = [p for p in pacientes if p["Metastasis"].lower() == "yes"]
    sem_metastase = [p for p in pacientes if p["Metastasis"].lower() == "no"]

    media_com = (
        sum(int(p["Age"]) for p in com_metastase) / len(com_metastase)
        if com_metastase
        else 0
    )
    media_sem = (
        sum(int(p["Age"]) for p in sem_metastase) / len(sem_metastase)
        if sem_metastase
        else 0
    )

    print(f"Média de Idade com Metástase: {media_com:.1f} anos")
    print(f"Média de Idade sem Metástase: {media_sem:.1f} anos")

    confirmar()


def pesquisa_por_provincia_estagio():
    titulo("Pesquisa por Província e Estágio")
    provincia = input("Informe a província (Hunan, Sichuan, Guangdong, Beijing): ").capitalize()
    estagio = input("Informe o estágio do câncer (I a IV): ").upper()

    resultados = [
        p
        for p in pacientes
        if p["Province"] == provincia and p["CancerStage"] == estagio
    ]

    if resultados:
        print(f"\nPacientes em {provincia} no estágio {estagio}:")
        print("Nº ID do Paciente....: Idade : Gênero : Etnia")
        print("-------------------------------------------------------------")
        for p in resultados:
            print(
                f"{p['PatientID']:20s} {p['Age']:>5} anos {p['Gender']:>7} {p['Ethnicity']}"
            )
        confirmar()

    else:
        print(f"\nNenhum paciente encontrado em {provincia} no estágio {estagio}.")
        confirmar()


def analise_por_estagio():
    titulo("Análise por Estágio de Câncer")
    estagio1 = input("Informe o primeiro estágio (I a IV): ").upper()
    estagio2 = input("Informe o segundo estágio (I a IV): ").upper()
    pacientes_estagio1 = {
        p["PatientID"] for p in pacientes if p["CancerStage"] == estagio1
    }
    pacientes_estagio2 = {
        p["PatientID"] for p in pacientes if p["CancerStage"] == estagio2
    }
    uniao = pacientes_estagio1.union(pacientes_estagio2)
    diferenca = pacientes_estagio1.difference(pacientes_estagio2)
    print(f"\nPacientes nos estágios {estagio1} ou {estagio2}: {len(uniao)}")
    print(f"Pacientes apenas no estágio {estagio1}: {len(diferenca)}")

    confirmar()


# Menu principal
while True:
    titulo("Análise de Pacientes com Câncer na China")
    print("1. Agrupar por Tipo de Tumor")
    print("2. Ordenar por Idade")
    print("3. Comparar Metástase")
    print("4. Pesquisa por Província e Estágio")
    print("5. Análise por Estágio de Câncer")
    print("6. Sair")

    try:
        opcao = int(input("Escolha uma opção: "))
    except ValueError:
        print("Opção inválida. Por favor, insira um número.")
        confirmar()
        continue

    if opcao == 1:
        agrupar_por_tipo_tumor()
    elif opcao == 2:
        ordenar_por_idade()
    elif opcao == 3:
        comparar_metastase()
    elif opcao == 4:
        pesquisa_por_provincia_estagio()
    elif opcao == 5:
        analise_por_estagio()
    else:
        break
