import flet as ft
import requests

API_URL = "http://localhost:3000/pratos"

def graf_caros(page):
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

    # Ordena por preço desc e pega top 10
    pratos_ordenados = sorted(pratos, key=lambda p: p.get("preco", 0), reverse=True)[:10]

    largura_max = 800
    maior_preco = max(p.get("preco", 0) for p in pratos_ordenados)

    linhas = []
    for p in pratos_ordenados:
        nome = p.get("nome", "Indefinido")
        preco = p.get("preco", 0)
        largura_barra = (preco / maior_preco) * largura_max
        barra = ft.Container(
            width=largura_barra,
            height=30,
            bgcolor=ft.Colors.RED_600,
            border_radius=5,
        )
        linha = ft.Row([
            ft.Text(nome, width=250),
            barra,
            ft.Text(f"R$ {preco:.2f}", width=100, text_align=ft.TextAlign.RIGHT),
        ], alignment=ft.MainAxisAlignment.START, vertical_alignment=ft.CrossAxisAlignment.CENTER, spacing=10)
        linhas.append(linha)

    return ft.Column(
        [ft.Text("Top 10 Pratos Mais Caros", size=22, weight="bold")] + linhas,
        spacing=10,
        scroll=ft.ScrollMode.AUTO,
    )
