import csv
formula1 = []

with open("winners.csv", mode="r") as arq:
  dados_csv = csv.DictReader(arq)
  for linha in dados_csv:
    formula1.append(linha)


def titulo(texto):
  print()
  print(texto)
  print("-"*40)

def top10_pilotos():
  pass

def equipes_10vitorias():
  pass

def top10_corridas():
  pass

def pilotos_anos():
  titulo("Anos de Vitórias de um Piloto")
  piloto = input("Nome do Piloto: ").upper()

  # conjunto de anos  
  anos = set()

  for corrida in formula1:
    if corrida['Winner'].upper() == piloto:
      anos.add(corrida['Date'][0:4])
      
  if len(anos) > 0:  
    anos2 = sorted(list(anos))
    print(f"{piloto} venceu corridas nos anos de: ")
    print(", ".join(anos2))
    print("-"*30)  
    print(f"Venceu corridas em: {len(anos2)} anos diferentes")
  else:
    print(f"{piloto} não venceu corridas")

def anos_vitorias():
  pass

while True:
  titulo("Dados de Corridas de Fórmula 1")
  print("1. Top 10 Pilotos + Vitoriosos")
  print("2. Equipes com 10 ou + Vitórias")
  print("3. Top 10 Corridas mais longas")
  print("4. Pilotos e anos de vitórias")
  print("5. Pilotos vitoriosos por ano")
  print("6. Finalizar")  
  opcao = int(input("Opção: "))
  if opcao == 1:
    top10_pilotos()
  elif opcao == 2:
    equipes_10vitorias()
  elif opcao == 3:
    top10_corridas()
  elif opcao == 4:
    pilotos_anos()
  elif opcao == 5:
    anos_vitorias()
  else:
    break
