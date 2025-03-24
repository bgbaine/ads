# Repetições com For
for i in range(10):    # vai de 0.. 9
    print(i)

print("-"*30)

for i in range(1, 5):    # vai de 1.. 4
    print(i, end=", ")   # 1, 2, 3, 4, 

print()
print("="*30)

for i in range(2, 10, 2):  # inicia em 2, até <10, pula 2
    print(i, end=", ")     # 2, 4, 6, 8, 

print()
print("*"*30)    

# Exibir 10, 9, 8, ... 1
for i in range(10, 0, -1):
    print(i, end=", ")

print()

# in "strings"
cidade = "Pelotas"
for letra in cidade:
    print(letra)