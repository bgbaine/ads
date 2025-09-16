GRAPH = {
    "Pelotas": {"Camaqua": 150, "Rio Grande": 55, "Bage": 180, "Santa Maria": 370},
    "Camaqua": {"Pelotas": 150, "Guaiba": 65, "Porto Alegre": 125},
    "Guaiba": {"Camaqua": 65, "Porto Alegre": 30},
    "Porto Alegre": {
        "Guaiba": 30,
        "Camaqua": 125,
        "Rio Grande": 320,
        "Bage": 380,
        "Santa Maria": 290,
    },
    "Rio Grande": {"Pelotas": 55, "Porto Alegre": 320},
    "Bage": {"Pelotas": 180, "Porto Alegre": 380},
    "Santa Maria": {"Pelotas": 370, "Porto Alegre": 290},
}

HEURISTICA_POA = {
    "Porto Alegre": 0,
    "Pelotas": 235,
    "Camaqua": 125,
    "Guaiba": 30,
    "Rio Grande": 320,
    "Bage": 380,
    "Santa Maria": 290,
}


def bfs(inicio, objetivo):
    fila = [[inicio]]
    visitados = []

    while len(fila) > 0:
        caminho = fila[0]
        fila = fila[1:]
        atual = caminho[-1]

        if atual == objetivo:
            return caminho, len(caminho) - 1

        if atual not in visitados:
            visitados.append(atual)
            for vizinho in GRAPH[atual]:
                novo_caminho = caminho + [vizinho]
                fila.append(novo_caminho)

    return [], 0


def dfs(inicio, objetivo):
    pilha = [[inicio]]
    visitados = []

    while len(pilha) > 0:
        caminho = pilha.pop()
        atual = caminho[-1]

        if atual == objetivo:
            return caminho, len(caminho) - 1

        if atual not in visitados:
            visitados.append(atual)
            for vizinho in GRAPH[atual]:
                novo_caminho = caminho + [vizinho]
                pilha.append(novo_caminho)

    return [], 0


def dijkstra(inicio, objetivo):
    custo_total = {}
    anterior = {}
    nao_visitados = list(GRAPH.keys())

    for cidade in GRAPH:
        custo_total[cidade] = float("inf")
        anterior[cidade] = None

    custo_total[inicio] = 0

    while len(nao_visitados) > 0:
        cidade_atual = None
        menor_custo = float("inf")
        for cidade in nao_visitados:
            if custo_total[cidade] < menor_custo:
                menor_custo = custo_total[cidade]
                cidade_atual = cidade

        if cidade_atual is None:
            break

        for vizinho in GRAPH[cidade_atual]:
            custo = GRAPH[cidade_atual][vizinho]
            novo_custo = custo_total[cidade_atual] + custo
            if novo_custo < custo_total[vizinho]:
                custo_total[vizinho] = novo_custo
                anterior[vizinho] = cidade_atual

        nao_visitados.remove(cidade_atual)

    caminho = []
    atual = objetivo
    while atual is not None:
        caminho.insert(0, atual)
        atual = anterior[atual]

    return caminho, custo_total[objetivo]


print(f"BFS:", bfs("Pelotas", "Porto Alegre"))
print("DFS:", dfs("Pelotas", "Porto Alegre"))
print(f"Dijkstra:", dijkstra("Pelotas", "Porto Alegre"))
