def gerar_casos_teste_qa(array):
    """
    Gera todos os casos de teste possíveis para QA de um sistema.
    Recebe uma lista de condições e retorna todos os cenários True/False.

    2ˆn !! Impossível otimizar sem perder combinações

    Args:
        array (list): Lista de condições (strings)
        exemplo array = ['criar_usuario','alterar_usuario','ler_usuario','excluir_usuario']

    return:
        total_casos (int): Total de casos gerados
    """
    n = len(array)
    total_casos = 2**n

    print(f"Sistema QA - Condições: {n}")
    print(f"Total de casos: {total_casos}")

    for i in range(total_casos):
        print(f"Caso {i+1:2d}: ", end="")
        print()

        # Esta operação é usada para determinar se uma condição específica
        # está True ou False em cada caso de teste. Cada número i representa
        # um caso de teste diferente, e cada posição j representa uma condição específica
        for j in range(n):
            # i >> j (Deslocamento à Direita)
            # O operador >> desloca todos os bits
            # do número i para a direita em j posições.
            #
            # operador & faz uma operação AND entre cada bit.
            # Como usamos & 1, estamos pegando apenas o bit menos
            # significativo (o da direita).
            bit = (i >> j) & 1

            # Se o último bit for 1: resultado = 1
            # Se o último bit for 0: resultado = 0
            status = "True " if bit else "False"

            if i > 2:
                exit()
            else:
                print(f"i {i} e j {j} => bit {bit} é {status}")
                """
                Exemplo, para i=2 `0010`:
                j=0: (0010 >> 0) & 1 = 0010 & 1 = 0 → False
                j=1: (0010 >> 1) & 1 = 0001 & 1 = 1 → True
                j=2: (0010 >> 2) & 1 = 0000 & 1 = 0 → False
                j=3: (0010 >> 3) & 1 = 0000 & 1 = 0 → False
                ...
                """

            # print(f"{array[j]}: {status}", end=" | ")

        print()  # Nova linha

    print(f"Gerados {total_casos} casos de teste!")
    return total_casos


# Teste com o exemplo
array = ["criar_usuario", "alterar_usuario", "ler_usuario", "excluir_usuario"]
# array = ["criar_usuario", "alterar_usuario", "ler_usuario", "excluir_usuario", "exportar", "importar"]
gerar_casos_teste_qa(array)
