import random
import time


class Utils:
    def ler_arquivo(nome_arquivo):
        valores = []
        with open(nome_arquivo, 'r') as arquivo:
            for linha in arquivo:
                valor = int(linha.strip())
                valores.append(valor)
        return valores

    def contar_items(arquivo):
        contador = 0
        for i in arquivo:
            contador += 1
        return contador


class NodeLista:
    # Construtor
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None


class NodeArvore:
    # Construtor
    def __init__(self, valor):
        self.valor = valor
        self.esquerda = None
        self.direita = None


class Arvore:
    def __init__(self):
        self.raiz = None

    def inserir(self, valor):
        # Raiz não existe!
        if self.raiz is None:
            self.raiz = NodeArvore(valor)
            # print(f"Criar a raiz com valor {valor}")
            return

        # Se existir uma raiz, o nó atual recebe o valor da raiz
        no_atual = self.raiz

        while True:
            # Se valor for menor que atual, olha para a esquerda do no_atual
            if valor < no_atual.valor:
                if no_atual.esquerda is None:
                    no_atual.esquerda = NodeArvore(valor)
                    break
                else:
                    no_atual = no_atual.esquerda

            # Se valor for maior que atual, olha para a direita do no_atual
            elif valor > no_atual.valor:
                if no_atual.direita is None:
                    no_atual.direita = NodeArvore(valor)
                    break
                else:
                    no_atual = no_atual.direita

            # Se o valor é igual ao atual
            else:
                # ignorar
                break

    def buscar(self, valor):
        no_atual = self.raiz

        # Se não existe raiz
        if no_atual is None:
            return False

        while no_atual is not None:
            # Existe o valor na árvore
            if valor == no_atual.valor:
                return True
            # Valor é menor
            elif valor < no_atual.valor:
                no_atual = no_atual.esquerda
            # Valor é maior
            else:
                no_atual = no_atual.direita
        # Valor não existe na árvore
        return False


class Lista:
    def __init__(self, otimizada=False):
        self.raiz = None
        self.ultimo = None
        self.otimizada = otimizada

    def inserir(self, valor):
        if self.otimizada:
            # Lista nao possui raiz
            if self.raiz is None:
                # Criar no raiz e tornar ele o ultimo da lista
                self.raiz = NodeLista(valor)
                self.ultimo = self.raiz
                return

            # Existindo raiz, o no atual sera o ultimo no da lista
            no_atual = self.ultimo

            # Cria novo no, linka ele ao atual e torna o novo no o novo ultimo no da lista
            no_atual.proximo = NodeLista(valor)
            self.ultimo = no_atual.proximo
        else:
            # Lista nao possui raiz
            if self.raiz is None:
                # Criar no raiz
                self.raiz = NodeLista(valor)
                return

            # Existindo raiz, o no atual sera o da raiz
            no_atual = self.raiz

            while True:
                # No atual nao aponta para nenhum outro
                if no_atual.proximo == None:
                    # No atual aponta para o valor a ser inserido
                    no_atual.proximo = NodeLista(valor)
                    return
                # No atual aponta para algum outro no
                else:
                    # No atual passa a ser o no que o atual esta apontando
                    no_atual = no_atual.proximo

    def buscar(self, valor):
        # O no atual e a raiz
        no_atual = self.raiz

        # Caso nao haja raiz, a lista esta vazia e portanto o valor nao esta nela
        if no_atual is None:
            return False

        # Enquanto nao chegarmos no final da listat
        while no_atual is not None:
            # Se o valor do no atual for o procurado
            if valor == no_atual.valor:
                return True
            # No atual nao possui o valor procurado, passamos para o no seguinte
            else:
                no_atual = no_atual.proximo

        # Caso nao tenha sido encontrado ate aqui, o valor nao esta na lista
        return False


class ListaQuestao4:
    def __init__(self):
        self.raiz = None

    def inserir(self, valor):
        novo_no = NodeLista(valor)

        # Se a lista está vazia, insere como raiz
        if self.raiz is None:
            self.raiz = novo_no
            return

        # Se o valor deve ser inserido no início
        if valor < self.raiz.valor:
            novo_no.proximo = self.raiz
            self.raiz = novo_no
            return

        # Caso contrário, procurar a posição correta
        atual = self.raiz
        while atual.proximo is not None and atual.proximo.valor < valor:
            atual = atual.proximo

        novo_no.proximo = atual.proximo
        atual.proximo = novo_no

    def buscar(self, valor):
        atual = self.raiz

        while atual is not None:
            if atual.valor == valor:
                return True
            # Se a lista está ordenada e o valor atual já passou do procurado
            if atual.valor > valor:
                return False
            atual = atual.proximo

        return False


def testar_arvore(n=100, valores_busca=None, seed_criacao=50, seed_busca=42, nome_arquivo=None):
    # Se arquivo foi inserido, extrair valores do arquivo
    if nome_arquivo != None:
        valores = Utils.ler_arquivo(nome_arquivo)
        if valores_busca != None:
            print(
                f"\nTestando arvore com n={Utils.contar_items(valores)}, valores_busca={valores_busca}, arquivo={nome_arquivo}")
        else:
            print(
                f"\nTestando arvore com n={Utils.contar_items(valores)}, seed_busca={seed_busca}, arquivo={nome_arquivo}")
    # Caso contrario, gerar valores com n e seeds informadas
    else:
        print(
            f"\nTestando arvore com n={n}, seed_criacao={seed_criacao}, seed_busca={seed_busca}")
        random.seed(seed_criacao)
        valores = [random.randint(1, 999) for _ in range(n)]

    # Instanciar a Árvore Binária
    arvore = Arvore()

    # Construir arvore
    inicio_arvore = time.perf_counter()
    for valor in valores:
        arvore.inserir(valor)
    print(
        f"Tempo construção arvore: {time.perf_counter() - inicio_arvore:.6f}")

    # Gerar numeros a serem buscados na arvore
    if valores_busca == None:
        random.seed(seed_busca)
        busca = [random.randint(1, 999) for _ in range(n)]
    else:
        busca = valores_busca

    # Buscar na arvore
    encontrou = False
    inicio_busca_arvore = time.perf_counter()
    for n in busca:
        resposta = arvore.buscar(n)
        if resposta:
            encontrou = True
        # print(f"O valor {n} está na árvore? {resposta}")

    print(
        f"Tempo busca arvore: {time.perf_counter() - inicio_busca_arvore:.6f}")

    if not encontrou:
        print("Nenhum valor foi encontrado na arvore!")


def testar_lista(n=100, valores_busca=None, seed_criacao=50, seed_busca=42, nome_arquivo=None, otimizada=False):
    # Se arquivo foi inserido, extrair valores do arquivo
    if nome_arquivo != None:
        valores = Utils.ler_arquivo(nome_arquivo)
        if valores_busca != None:
            print(
                f"\nTestando lista com n={Utils.contar_items(valores)}, valores_busca={valores_busca}, arquivo={nome_arquivo}")
        else:
            print(
                f"\nTestando lista com n={Utils.contar_items(valores)}, seed_busca={seed_busca}, arquivo={nome_arquivo}")
    # Caso contrario, gerar valores com n e seeds informadas
    else:
        print(
            f"\nTestando lista com n={n}, seed_criacao={seed_criacao}, seed_busca={seed_busca}")
        random.seed(seed_criacao)
        valores = [random.randint(1, 999) for _ in range(n)]

    # Instanciar a lista
    lista = Lista(otimizada)

    # Construir lista
    inicio_lista = time.perf_counter()
    for valor in valores:
        lista.inserir(valor)
    print(
        f"Tempo de construção da lista: {time.perf_counter() - inicio_lista:.6f}")

    # Gerar numeros a serem buscados na lista
    if valores_busca == None:
        random.seed(seed_busca)
        busca = [random.randint(1, 999) for _ in range(n)]
    else:
        busca = valores_busca

    # Buscar na lista
    encontrou = False
    inicio_busca_lista = time.perf_counter()
    for n in busca:
        resposta = lista.buscar(n)
        if resposta:
            encontrou = True
        # print(f"O valor {n} está na lista? {resposta}")

    print(
        f"Tempo de busca da lista: {time.perf_counter() - inicio_busca_lista:.6f}")

    if not encontrou:
        print("Nenhum valor foi encontrado na lista!")


def testar_lista_questao_4(n=100, valores_busca=None, seed_criacao=50, seed_busca=42, nome_arquivo=None):
    # Se arquivo foi inserido, extrair valores do arquivo
    if nome_arquivo != None:
        valores = Utils.ler_arquivo(nome_arquivo)
        if valores_busca != None:
            print(
                f"\nTestando lista com n={Utils.contar_items(valores)}, valores_busca={valores_busca}, arquivo={nome_arquivo}")
        else:
            print(
                f"\nTestando lista com n={Utils.contar_items(valores)}, seed_busca={seed_busca}, arquivo={nome_arquivo}")
    # Caso contrario, gerar valores com n e seeds informadas
    else:
        print(
            f"\nTestando lista com n={n}, seed_criacao={seed_criacao}, seed_busca={seed_busca}")
        random.seed(seed_criacao)
        valores = [random.randint(1, 999) for _ in range(n)]

    # Instanciar a lista
    lista = ListaQuestao4()

    # Construir lista
    inicio_lista = time.perf_counter()
    for valor in valores:
        lista.inserir(valor)
    print(
        f"Tempo de construção da lista: {time.perf_counter() - inicio_lista:.6f}")

    # Gerar numeros a serem buscados na lista
    if valores_busca == None:
        random.seed(seed_busca)
        busca = [random.randint(1, 999) for _ in range(n)]
    else:
        busca = valores_busca

    # Buscar na lista
    encontrou = False
    inicio_busca_lista = time.perf_counter()
    for n in busca:
        resposta = lista.buscar(n)
        if resposta:
            encontrou = True
        # print(f"O valor {n} está na lista? {resposta}")

    print(
        f"Tempo de busca da lista: {time.perf_counter() - inicio_busca_lista:.6f}")

    if not encontrou:
        print("Nenhum valor foi encontrado na lista!")


def questao_1():
    # Arvore ja se mostra mais rapida, porem ainda pouco relevante
    testar_arvore(n=100)
    testar_lista(n=100)
    testar_arvore(n=1000)
    testar_lista(n=1000)

    # A busca na lista ja demora quase 1s, enquanto é praticamente instantanea na arvore
    testar_arvore(nome_arquivo="conjunto_pequeno.txt")
    testar_lista(nome_arquivo="conjunto_pequeno.txt", otimizada=False)

    # Exemplificacao da cada vez maior superioridade da arvore em busca
    testar_arvore(nome_arquivo="conjunto_medio.txt")
    testar_lista(nome_arquivo="conjunto_medio.txt", otimizada=True)


def questao_2():
    # Busca de valores que existem e nao existem na lista
    testar_arvore(n=1000)
    testar_lista(n=1000)
    testar_arvore(nome_arquivo="conjunto_pequeno.txt")
    testar_lista(nome_arquivo="conjunto_pequeno.txt", otimizada=False)
    testar_arvore(nome_arquivo="conjunto_medio.txt")
    testar_lista(nome_arquivo="conjunto_medio.txt", otimizada=True)
    testar_arvore(nome_arquivo="conjunto_grande.txt")
    testar_lista(nome_arquivo="conjunto_grande.txt", otimizada=True)

    # Busca de valores que nao existem na lista
    nao_existem = [11, 21, 27, 28, 29, 30, 32, 445]
    testar_arvore(valores_busca=nao_existem,
                  nome_arquivo="conjunto_pequeno.txt")
    testar_lista(valores_busca=nao_existem,
                 nome_arquivo="conjunto_pequeno.txt", otimizada=True)

    testar_arvore(valores_busca=nao_existem, nome_arquivo="conjunto_medio.txt")
    testar_lista(valores_busca=nao_existem,
                 nome_arquivo="conjunto_medio.txt", otimizada=True)

    testar_arvore(valores_busca=nao_existem,
                  nome_arquivo="conjunto_grande.txt")
    testar_lista(valores_busca=nao_existem,
                 nome_arquivo="conjunto_grande.txt", otimizada=True)


def questao_4():
    testar_lista_questao_4(n=1000)
    testar_lista_questao_4(n=10000)
    testar_lista_questao_4(n=50000)
    testar_lista_questao_4(nome_arquivo="conjunto_pequeno.txt")
    nao_existem = [11, 21, 27, 28, 29, 30, 32, 445]
    testar_lista_questao_4(valores_busca=nao_existem,
                           nome_arquivo="conjunto_pequeno.txt")


if __name__ == "__main__":

    questao_1()
    questao_2()
    questao_4()
