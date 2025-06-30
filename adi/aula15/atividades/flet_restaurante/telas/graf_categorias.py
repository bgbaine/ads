import flet as ft
import requests

API_URL = "http://localhost:3000/pratos"

def graf_categorias(page):
    def obter_pratos_api():
        try:
            response = requests.get(API_URL)
            response.raise_for_status()
            return response.json()
        except Exception as err:
            page.snack_bar = ft.SnackBar(ft.Text(f"Erro ao carregar pratos: {err}"))
            page.snack_bar.open = True
            page.update()
            return []

    pratos = obter_pratos_api()
    if not pratos:
        return ft.Text("Nenhum dado disponível.")

    contagem = {}
    for p in pratos:
        cat = p.get("categoria", "Outros")
        contagem[cat] = contagem.get(cat, 0) + 1

    categorias_ordenadas = sorted(contagem.items(), key=lambda item: item[1], reverse=True)
    cores = [
        ft.Colors.BLUE, ft.Colors.GREEN, ft.Colors.ORANGE,
        ft.Colors.PINK, ft.Colors.PURPLE, ft.Colors.CYAN,
        ft.Colors.RED, ft.Colors.YELLOW, ft.Colors.AMBER,
        ft.Colors.BROWN, ft.Colors.GREY
    ]

    largura_max = 800
    maior_qtd = max(qtd for _, qtd in categorias_ordenadas)
    total_pratos = sum(qtd for _, qtd in categorias_ordenadas)

    linhas = []
    for i, (categoria, qtd) in enumerate(categorias_ordenadas):
        largura_barra = (qtd / maior_qtd) * largura_max
        percentual = (qtd / total_pratos) * 100
        cor = cores[i % len(cores)]
        barra = ft.Container(
            width=largura_barra,
            height=30,
            bgcolor=cor,
            border_radius=5,
        )
        linha = ft.Row([
            ft.Text(categoria, width=150),
            barra,
            ft.Text(f"{qtd} prato(s) — {percentual:.1f}%", width=180, text_align=ft.TextAlign.RIGHT),
        ], alignment=ft.MainAxisAlignment.START, vertical_alignment=ft.CrossAxisAlignment.CENTER, spacing=10)
        linhas.append(linha)

    return ft.Column(
        [ft.Text("Pratos por Categoria", size=22, weight="bold")] + linhas,
        spacing=10,
        scroll=ft.ScrollMode.AUTO,
    )
