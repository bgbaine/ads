from helpers import *


def main():
    while True:
        limpar_tela()
        exibir_menu()
        opcao = input("Escolha uma opção: ").lower()

        if opcao == "1":
            resetar_jogo()
            nome_jogador = input("Digite seu nome: ")
            limpar_tela()
            desenhar_tabuleiro_jogador()
            adicionar_navios_jogador_mod()
            # adicionar_navios_jogador()
            adicionar_navios_cpu()

            while MUNICAO_JOGADOR > 0 and MUNICAO_CPU > 0:
                limpar_tela()
                print("=== SEU TABULEIRO ===")
                desenhar_tabuleiro_jogador()
                print("=== ATAQUES NA CPU ===")
                desenhar_tabuleiro_cpu_mod()
                # desenhar_tabuleiro_cpu()
                atacar_posicao_jogador(nome_jogador)
                if obter_ganhador(nome_jogador):
                    break
                atacar_posicao_cpu(nome_jogador)
                if obter_ganhador(nome_jogador):
                    break

        elif opcao == "2":
            limpar_tela()
            print("=== INSTRUÇÕES ===")
            print("Coloque seus navios, ataque as posições do inimigo e vença!")
            print("Acertos ganham 2 munições e 3 pontos. Erros perdem 1 munição.")
            pressione_enter()

        elif opcao == "3":
            carregar_ranking()
            pressione_enter()

        elif opcao == "4":
            print("Saindo do jogo. Até mais!")
            break
        else:
            print("Opção inválida!")
            pressione_enter()


if __name__ == "__main__":
    main()
