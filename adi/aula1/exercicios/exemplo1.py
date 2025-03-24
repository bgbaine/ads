'''
  Exemplos de Entrada e Saída de Dados
  Condições simples e compostas
'''

# Entrada de Dados
nome = input("Nome do Aluno: ")
idade = int(input("Idade: "))
salario = float(input("Salário R$: "))

# Saída de Dados
print("---------------------------")
print(f"Seu nome é: {nome}")
print(f'Sua idade é: {idade} anos')
print(f"Salário Atual R$: {salario:9.2f}")

# Condições simples
if idade >= 18:
    print("Você é MAIOR de idade")
else:
    print("Você é menor de idade")
        
print("===============================")

# Obs.: A identação define os blocos em Python    

# Condições Compostas
if salario <= 2000:
    print("Salário Júnior")
elif salario <= 5000:
    print("Salário Pleno")
else:
    print("Salário Sênior")

bairro = input("Bairro: ").upper()

match bairro:
    case "CENTRO":
        print("Você mora aqui por perto")
    case "FRAGATA" | "TRÊS VENDAS":
        print("Ainda é perto")
    case "LARANJAL":
        print("Você mora longe")
    case _:
        print("Não sei responder...")
