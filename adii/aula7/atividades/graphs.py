import matplotlib.pyplot as plt

# Dados
n_values = [1000, 100000, 5000000, 30000000]
tempo_construcao_arvore = [0.000341, 0.068897, 9.828066, 84.501408]
tempo_construcao_lista = [0.008544, 0.009841, 0.892985, 5.537860]

tempo_busca_arvore = [0.000337, 0.000071, 0.000091, 0.000018]
tempo_busca_lista = [0.012492, 0.125194, 6.569531, 3.336123]

# Gráfico 1 - Tempo de Construção
plt.figure(figsize=(10, 6))
plt.plot(n_values, tempo_construcao_arvore, marker='o', label='Árvore')
plt.plot(n_values, tempo_construcao_lista, marker='s', label='Lista')
plt.xlabel('Tamanho n')
plt.ylabel('Tempo de Construção (s)')
plt.title('Tempo de Construção vs Tamanho n')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()

# Gráfico 2 - Tempo de Busca
plt.figure(figsize=(10, 6))
plt.plot(n_values, tempo_busca_arvore, marker='o', label='Árvore')
plt.plot(n_values, tempo_busca_lista, marker='s', label='Lista')
plt.xlabel('Tamanho n')
plt.ylabel('Tempo de Busca (s)')
plt.title('Tempo de Busca vs Tamanho n')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()