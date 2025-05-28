import csv
import locale
locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8') 

jogadores = []

with open("BRA_players.csv", mode="r") as arq:
  dados_csv = csv.DictReader(arq)
  for linha in dados_csv:
    jogadores.append(linha)


def titulo(texto):
  print()
  print(texto)
  print("-"*40)


def clubes_valiosos():
  titulo("Lista dos Clubes + Valiosos")

  grupos = {}

  for jogador in jogadores:
    clube = jogador['Team']
    if jogador['Market Value'] == "":
      valor = 0
    else: 
      valor = float(jogador['Market Value'])
    grupos[clube] = grupos.get(clube, 0) + valor
    # grupos = {"São Paulo": 345000, "Grêmio": 250000}

#   print(grupos)
  print("Nº Nome do Clube...........: Valor Total...:")

  # ordena as chaves/valores do dicionário
  grupos2 = dict(sorted(grupos.items(), 
                        key=lambda grupo: grupo[1], reverse=True))

  for num, (clube, valor) in enumerate(grupos2.items(), start=1):
    valor2 = locale.currency(valor, grouping=True, symbol=None)
    print(f"{num:2d} {clube:25s} {valor2:>15s}")
    if num == 10:
      break

def jovens_experientes():
  titulo("Top 10: Jogadores + Jovens")

  print("Nº Nome do Jogador.........: Clube..............: Idade.:")
  print("---------------------------------------------------------")

  jogadores2 = sorted(jogadores, 
                      key=lambda jogador: int(jogador['Age']))
  
  for num, jogador in enumerate(jogadores2, start=1):
    print(f"{num:2d} {jogador['Player']:25s} {jogador['Team']:20s} {jogador['Age']} anos")
    if num == 10:
      break

  titulo("Top 10: Jogadores + Experientes")

  print("Nº Nome do Jogador.........: Clube..............: Idade.:")
  print("---------------------------------------------------------")

  jogadores3 = reversed(jogadores2)
  
  for num, jogador in enumerate(jogadores3, start=1):
    print(f"{num:2d} {jogador['Player']:25s} {jogador['Team']:20s} {jogador['Age']} anos")
    if num == 10:
      break


def compara_clubes():
  titulo("Compara Clubes: Média de Idade dos Jogadores")

  clube1 = input("1º Clube: ")
  clube2 = input("2º Clube: ")

  num1 = soma1 = num2 = soma2 = 0

  for jogador in jogadores:
    if jogador['Team'].upper() == clube1.upper():
      num1 = num1 + 1
      soma1 = soma1 + int(jogador['Age'])  
    elif jogador['Team'].upper() == clube2.upper():
      num2 += 1
      soma2 += int(jogador['Age'])    

  if num1 > 0:  
    media1 = soma1 / num1  
    print(f"Média das Idades dos Jogadores do {clube1}: {media1:4.1f}")
  else:
    print(f"Não há jogadores do clube: {clube1}")  

  try:
    media2 = soma2 / num2  
    print(f"Média das Idades dos Jogadores do {clube2}: {media2:4.1f}")
  except ZeroDivisionError:
    print(f"Não há jogadores do clube: {clube2}")  


def pesquisa():
  titulo("Pesquisa por Nome do Jogador")

  nome = input("Nome do Jogador: ")

  jogadores2 = [jogador for jogador in jogadores 
                if nome.upper() in jogador['Player'].upper()]

  if len(jogadores2) == 0:
    print(f"\nNão há jogadores com o nome: {nome}")  
  else:
    print("\nNome do Jogador.........: Clube..............:")
    print(  "----------------------------------------------")

    for jogador in jogadores2:
      print(f"{jogador['Player']:25s} {jogador['Team']}")


def analise_idade():
  titulo("Análise por Idade")

  idade = int(input("Idade: "))

  # converter a lista em conjunto(set) remove as duplicidades
  clubes_com = set([jogador['Team'] for jogador in jogadores
                 if int(jogador['Age']) == idade])
  
  # pode-se converter novamente em lista, para ordenar, por exemplo
  clubes_com2 = sorted(list(clubes_com))
  
  print(f"\nClubes que possuem jogadores com {idade} anos:")
  print(", ".join(clubes_com2))

  # obtém o nome de todos os clubes
  clubes_totais = set([jogador['Team'] for jogador in jogadores])

  clubes_sem = clubes_totais.difference(clubes_com)  

  clubes_sem2 = sorted(list(clubes_sem))

  print(f"\nClubes que não possuem jogadores com {idade} anos:")
  print(", ".join(clubes_sem2))


while True:
  titulo("Brasileirão: Análise dos Clubes e Jogadores")
  print("1. Clubes: +Valiosos")
  print("2. Jogadores: +Jovens e +Experientes")
  print("3. Compara Clubes: Média de Idades")
  print("4. Pesquisa por Nome do Jogador")
  print("5. Análise por Idade")
  print("6. Finalizar")
  try:
    opcao = int(input("Opção: "))
  except ValueError:
    print("Opção Inválida... Digite um número")
    continue
  
  if opcao == 1:
    clubes_valiosos()
  elif opcao == 2:
    jovens_experientes()
  elif opcao == 3:
    compara_clubes()
  elif opcao == 4:
    pesquisa()
  elif opcao == 5:
    analise_idade()
  else:
    break
    