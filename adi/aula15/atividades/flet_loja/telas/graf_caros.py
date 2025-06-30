import flet as ft
import requests

API_URL = "http://localhost:3000/produtos"

def graf_caros(page):

    def obter_produtos_api():
        try:
            response = requests.get(API_URL)
            response.raise_for_status()
            return response.json()
        except Exception as err:
            page.snack_bar = ft.SnackBar(ft.Text(f"Erro ao carregar produtos: {err}"))
            page.snack_bar.open = True
            page.update()
            return []

    produtos = obter_produtos_api()

    if not produtos:
        return ft.Text("Nenhum dado disponível.")

    # Ordena produtos por preço (decrescente) e pega os 10 mais caros
    produtos_ordenados = sorted(produtos, key=lambda p: p['preco'], reverse=True)[:10]

    # Define cores para as barras
    cores = [
        ft.Colors.RED,
        ft.Colors.ORANGE,
        ft.Colors.YELLOW,
        ft.Colors.GREEN,
        ft.Colors.CYAN,
        ft.Colors.BLUE,
        ft.Colors.PURPLE,
        ft.Colors.PINK,
        ft.Colors.AMBER,
        ft.Colors.BROWN,
    ]

    largura_max = 800
    maior_preco = produtos_ordenados[0]['preco']

    linhas = []

    for i, produto in enumerate(produtos_ordenados):
        nome = produto['nome']
        preco = produto['preco']
        cor = cores[i % len(cores)]
        largura_barra = (preco / maior_preco) * largura_max

        barra = ft.Container(
            width=largura_barra,
            height=30,
            bgcolor=cor,
            border_radius=5,
        )

        linha = ft.Row(
            [
                ft.Text(nome, width=200),
                barra,
                ft.Text(f"R$ {preco:,.2f}", width=120, text_align=ft.TextAlign.RIGHT)
            ],
            alignment=ft.MainAxisAlignment.START,
            vertical_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=10
        )

        linhas.append(linha)

    return ft.Column(
        [ft.Text("Top 10 Produtos Mais Caros", size=22, weight="bold")] + linhas,
        spacing=10,
        scroll=ft.ScrollMode.AUTO
    )