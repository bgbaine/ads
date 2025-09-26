import random
import time


class Node:
    # método construtor
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
            self.raiz = Node(valor)
            # print(f"Criar a raiz com valor {valor}")
            return

        # Se existir uma raiz, o nó atual recebe o valor da raiz
        no_atual = self.raiz

        while True:
            # Se valor for menor que atual, olha para a esquerda do no_atual
            if valor < no_atual.valor:
                if no_atual.esquerda is None:
                    no_atual.esquerda = Node(valor)
                    break
                else:
                    no_atual = no_atual.esquerda

            # Se valor for maior que atual, olha para a direita do no_atual
            elif valor > no_atual.valor:
                if no_atual.direita is None:
                    no_atual.direita = Node(valor)
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


if __name__ == "__main__":

    # valores = ler_arquivo('conjunto_medio.txt')
    random.seed(50)
    valores = [random.randint(1, 999) for _ in range(5)]

    # Instanciar a Árvore Binária
    arvore = Arvore()

    inicio_arvore = time.perf_counter()
    # Inserir valores na Árvore
    for valor in valores:
        arvore.inserir(valor)
    print(f"tempo construção {time.perf_counter() - inicio_arvore:.6f}")

    random.seed(42)
    busca = [random.randint(1, 999) for _ in range(5)]

    inicio_busca = time.perf_counter()
    for n in busca:
        resposta = arvore.buscar(n)
        print(f"O valor {n} está na árvore? {resposta}")
    print(f"tempo busca {time.perf_counter() - inicio_busca:.6f}")
