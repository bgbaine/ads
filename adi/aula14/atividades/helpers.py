from config import DEMO
import random
import csv
import time


MUNICAO_CPU: int = 10
MUNICAO_JOGADOR: int = 10

NUMERO_PORTA_AVIOES: int = 1
NUMERO_ENCOURACADOS: int = 2
NUMERO_HIDROAVIOES: int = 3
NUMERO_SUBMARINOS: int = 4
NUMERO_CRUZADORES: int = 3

PORTA_AVIOES: str = "🟨🟨🟨🟨🟨"
ENCOURACADO: str = "🟥🟥🟥🟥"
HIDROAVIAO: list[str] = ["🟦🔲🟦", "🔲🟦🔲"]
SUBMARINO: str = "🟩🟩🟩"
CRUZADOR: str = "🟧🟧"

TABULEIRO_JOGADOR: list[list[str]] = [["🔲" for _ in range(15)] for _ in range(15)]
TABULEIRO_CPU: list[list[str]] = [["🔲" for _ in range(15)] for _ in range(15)]


def exibir_menu() -> None:
    print("=== BATALHA NAVAL ===")
    print("1. Jogar")
    print("2. Instruções")
    print("3. Ranking")
    print("4. Sair")


def resetar_jogo() -> None:
    global MUNICAO_JOGADOR, MUNICAO_CPU, PONTUACAO_JOGADOR, PONTUACAO_CPU
    MUNICAO_JOGADOR = 3
    MUNICAO_CPU = 3
    PONTUACAO_JOGADOR = 0
    PONTUACAO_CPU = 0
    for i in range(15):
        for j in range(15):
            TABULEIRO_JOGADOR[i][j] = "🔲"
            TABULEIRO_CPU[i][j] = "🔲"


def desenhar_tabuleiro_jogador() -> None:
    for linha in TABULEIRO_JOGADOR:
        print("".join(linha))


def adicionar_navios_jogador_mod() -> None:
    limpar_tela()
    print("Posicionando navios automaticamente para o jogador...")

    # Porta-aviões
    for i in range(5):
        TABULEIRO_JOGADOR[0][i] = "🟨"

    # Encouraçados
    for i in range(4):
        TABULEIRO_JOGADOR[i + 11][0] = "🟥"
        TABULEIRO_JOGADOR[i + 8][10] = "🟥"

    # Submarinos
    for i in range(3):
        TABULEIRO_JOGADOR[1 + i][12] = "🟩"
        TABULEIRO_JOGADOR[13][i] = "🟩"
        TABULEIRO_JOGADOR[14][11 + i] = "🟩"

    # Cruzadores
    TABULEIRO_JOGADOR[2][7] = "🟧"
    TABULEIRO_JOGADOR[2][8] = "🟧"

    TABULEIRO_JOGADOR[6][10] = "🟧"
    TABULEIRO_JOGADOR[6][11] = "🟧"

    TABULEIRO_JOGADOR[8][0] = "🟧"
    TABULEIRO_JOGADOR[9][0] = "🟧"

    # Hidroaviões
    TABULEIRO_JOGADOR[3][2] = "🟦"
    TABULEIRO_JOGADOR[3][4] = "🟦"
    TABULEIRO_JOGADOR[4][3] = "🟦"

    TABULEIRO_JOGADOR[4][6] = "🟦"
    TABULEIRO_JOGADOR[4][8] = "🟦"
    TABULEIRO_JOGADOR[5][7] = "🟦"

    TABULEIRO_JOGADOR[8][3] = "🟦"
    TABULEIRO_JOGADOR[8][5] = "🟦"
    TABULEIRO_JOGADOR[9][4] = "🟦"

    print("Navios posicionados automaticamente com sucesso!")
    desenhar_tabuleiro_jogador()
    pressione_enter()


def adicionar_navios_jogador() -> None:
    adicionar_navio(
        PORTA_AVIOES, len(PORTA_AVIOES), NUMERO_PORTA_AVIOES, "Porta-aviões"
    )
    adicionar_navio(ENCOURACADO, len(ENCOURACADO), NUMERO_ENCOURACADOS, "Encouraçado")
    adicionar_navio(HIDROAVIAO, len(HIDROAVIAO), NUMERO_HIDROAVIOES, "Hidroaviões")
    adicionar_navio(SUBMARINO, len(SUBMARINO), NUMERO_SUBMARINOS, "Submarinos")
    adicionar_navio(CRUZADOR, len(CRUZADOR), NUMERO_CRUZADORES, "Cruzadores")


def adicionar_navio(
    navio: list[str] | str, tamanho: int, quantidade: int, nome: str
) -> None:

    contagem = 0
    while contagem < quantidade:
        print(f"Coloque {nome} {navio} {contagem + 1} de {quantidade}") if isinstance(
            navio, str
        ) else print(f"Coloque {nome} {contagem + 1} de {quantidade}")
        try:
            linha = int(input("Digite a linha inicial (0-14): "))
            coluna = int(input("Digite a coluna inicial (0-14): "))
            orientacao = input(
                "Digite a orientação da embarcação (h para horizontal, v para vertical): "
            ).lower()

            posicoes = []
            for i in range(tamanho):
                if orientacao == "h":
                    posicoes.append((linha, coluna + i))
                elif orientacao == "v":
                    posicoes.append((linha + i, coluna))
                else:
                    print("Orientação inválida.")
                    posicoes = []
                    break

            if not posicoes:
                continue

            if not all(
                verificar_posicao(x, y)
                and not verificar_colisao(TABULEIRO_JOGADOR[x][y])
                for x, y in posicoes
            ):
                limpar_tela()
                print("Posição inválida ou já ocupada. Tente novamente.")
                desenhar_tabuleiro_jogador()
                continue

            if isinstance(
                navio, str
            ):  # caso do PORTA_AVIOES, ENCOURACADO, SUBMARINO ou CRUZADOR
                for i, (x, y) in enumerate(posicoes):
                    TABULEIRO_JOGADOR[x][y] = navio[i]
            else:  # caso do HIDROAVIAO
                for dx, linha_navio in enumerate(navio):
                    for dy, bloco in enumerate(linha_navio):
                        x, y = posicoes[0][0] + dx, posicoes[0][1] + dy
                        if verificar_posicao(x, y) and not verificar_colisao(
                            TABULEIRO_JOGADOR[x][y]
                        ):
                            TABULEIRO_JOGADOR[x][y] = bloco
                        else:
                            print("Posição inválida para Hidroavião.")
                            break

            contagem += 1
            limpar_tela()
            print(f"{nome} adicionado com sucesso!")
            desenhar_tabuleiro_jogador()
            pressione_enter()

        except ValueError:
            print("Entrada inválida. Digite números inteiros para as coordenadas.")


def adicionar_navios_cpu():
    navios = [
        (PORTA_AVIOES, len(PORTA_AVIOES), NUMERO_PORTA_AVIOES),
        (ENCOURACADO, len(ENCOURACADO), NUMERO_ENCOURACADOS),
        (SUBMARINO, len(SUBMARINO), NUMERO_SUBMARINOS),
        (CRUZADOR, len(CRUZADOR), NUMERO_CRUZADORES),
    ]
    for navio, tamanho, quantidade in navios:
        contagem = 0
        while contagem < quantidade:
            linha = random.randint(0, 14)
            coluna = random.randint(0, 14)
            orientacao = random.choice(["h", "v"])
            posicoes = []
            for i in range(tamanho):
                if orientacao == "h":
                    posicoes.append((linha, coluna + i))
                else:
                    posicoes.append((linha + i, coluna))
            if all(
                verificar_posicao(x, y) and not verificar_colisao(TABULEIRO_CPU[x][y])
                for x, y in posicoes
            ):
                for i, (x, y) in enumerate(posicoes):
                    TABULEIRO_CPU[x][y] = navio[i]
                contagem += 1

    # Hidroaviões
    contagem = 0
    while contagem < NUMERO_HIDROAVIOES:
        linha = random.randint(0, 13)
        coluna = random.randint(0, 13)
        pode = True
        for dx, linha_navio in enumerate(HIDROAVIAO):
            for dy, bloco in enumerate(linha_navio):
                x, y = linha + dx, coluna + dy
                if not verificar_posicao(x, y) or verificar_colisao(
                    TABULEIRO_CPU[x][y]
                ):
                    pode = False
        if pode:
            for dx, linha_navio in enumerate(HIDROAVIAO):
                for dy, bloco in enumerate(linha_navio):
                    x, y = linha + dx, coluna + dy
                    TABULEIRO_CPU[x][y] = bloco
            contagem += 1


def desenhar_tabuleiro_cpu_mod():
    for linha in TABULEIRO_CPU:
        print("".join(linha))


def desenhar_tabuleiro_cpu():
    for linha in TABULEIRO_CPU:
        print("".join("🔲" if c != "🟫" else "🟫" for c in linha))


def verificar_posicao(cord1: int, cord2: int) -> bool:
    if 0 <= cord1 < 15 and 0 <= cord2 < 15:
        return True
    return False


def verificar_colisao(bloco: str) -> bool:
    if bloco != "🔲":
        return True
    return False


def obter_ganhador(nome_jogador: str) -> bool:
    if MUNICAO_JOGADOR <= 0:
        print(f"Fim de jogo! CPU venceu com {PONTUACAO_CPU} pontos.")
        pressione_enter()
        return True
    elif MUNICAO_CPU <= 0:
        print(f"Parabéns {nome_jogador}, você venceu com {PONTUACAO_JOGADOR} pontos!")
        pressione_enter()
        salvar_ranking(nome_jogador)
        return True
    return False


def exibir_estado_jogador(nome):
    print(f"Sua pontuacao: {PONTUACAO_JOGADOR}")
    print(f"Munição atual do jogador: {MUNICAO_JOGADOR}")
    print()


def exibir_estado_cpu():
    print(f"Pontuacao da CPU: {PONTUACAO_CPU}")
    print(f"Munição atual da CPU: {MUNICAO_CPU}")


def animacao_ataque():
    for etapa in ["Preparando", "Apontando", "Disparando"]:
        print(etapa + "...")
        time.sleep(1)


def atacar_posicao_jogador(nome_jogador):
    global MUNICAO_JOGADOR, PONTUACAO_JOGADOR
    while True:
        limpar_tela()
        print("=== SEU TABULEIRO ===")
        desenhar_tabuleiro_jogador()
        print("=== ATAQUES NA CPU ===")
        desenhar_tabuleiro_cpu_mod() if DEMO else desenhar_tabuleiro_cpu()
        exibir_estado_jogador(nome_jogador)

        try:
            linha = int(input("Digite a linha para atacar (0-14): "))
            coluna = int(input("Digite a coluna para atacar (0-14): "))

            if not verificar_posicao(linha, coluna):
                print("Coordenada inválida.")
                pressione_enter()
                continue

            if TABULEIRO_CPU[linha][coluna] == "🟫":
                print("Essa posição já foi atacada.")
                pressione_enter()
                continue

            time.sleep(1)
            limpar_tela()
            print(f"{nome_jogador}: Atacando posição ({linha}, {coluna})")
            animacao_ataque()

            if TABULEIRO_CPU[linha][coluna] != "🔲":
                limpar_tela()
                print("CPU: Bomba!")
                PONTUACAO_JOGADOR += 3
                MUNICAO_JOGADOR += 2
                print("+3 pontos e +2 de munição para o jogador!")
                TABULEIRO_CPU[linha][coluna] = "🟫"
            else:
                limpar_tela()
                print("CPU: Água!")
                MUNICAO_JOGADOR -= 1
                TABULEIRO_CPU[linha][coluna] = "🟫"

                print()
                print("=== ATAQUES NA CPU ===")
                desenhar_tabuleiro_cpu_mod() if DEMO else desenhar_tabuleiro_cpu()
                pressione_enter()
                limpar_tela()
                break

            print()
            print("=== ATAQUES NA CPU ===")
            desenhar_tabuleiro_cpu_mod() if DEMO else desenhar_tabuleiro_cpu()
            pressione_enter()
            limpar_tela()

        except ValueError:
            print("Coordenadas inválidas.")
            pressione_enter()


def atacar_posicao_cpu(nome_jogador):
    global MUNICAO_CPU, PONTUACAO_CPU
    while True:
        exibir_estado_cpu()
        linha = random.randint(0, 14)
        coluna = random.randint(0, 14)

        if TABULEIRO_JOGADOR[linha][coluna] == "🟫":
            continue  # já atacado

        print(f"CPU: Atacando posição ({linha}, {coluna})")
        animacao_ataque()

        if TABULEIRO_JOGADOR[linha][coluna] != "🔲":
            limpar_tela()
            print(f"{nome_jogador}: Bomba!")
            PONTUACAO_CPU += 3
            MUNICAO_CPU += 2
            print("+3 pontos e +2 de munição para a CPU!\n")
            TABULEIRO_JOGADOR[linha][coluna] = "🟫"
        else:
            limpar_tela()
            print(f"{nome_jogador}: Água!\n")
            MUNICAO_CPU -= 1
            TABULEIRO_JOGADOR[linha][coluna] = "🟫"

            desenhar_tabuleiro_jogador()
            pressione_enter()
            limpar_tela()
            break

        desenhar_tabuleiro_jogador()
        pressione_enter()
        limpar_tela()


def carregar_ranking():
    try:
        with open("ranking.csv", newline="") as f:
            reader = csv.reader(f)
            ranking = sorted(reader, key=lambda x: int(x[1]), reverse=True)
            limpar_tela()
            print("=== TOP 10 JOGADORES ===")
            for i, (nome, pontos) in enumerate(ranking[:10]):
                print(f"{i+1}. {nome}: {pontos} pontos")
    except FileNotFoundError:
        limpar_tela()
        print("Ranking ainda não disponível. Ganhe uma partida para criar o ranking.")


def salvar_ranking(nome_jogador: str):
    try:
        with open("ranking.csv", "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([nome_jogador, PONTUACAO_JOGADOR])
    except:
        print("Erro ao salvar o ranking.")


def limpar_tela():
    print("\n" * 100)


def pressione_enter():
    input("Pressione Enter para continuar...")
