import flet as ft
import requests

API_URL = "http://localhost:3000/pratos"

def pesq_nome(page):
    txt_nome = ft.TextField(
        label="Nome do Prato",
        hint_text="Digite o nome do prato",
        width=300,
    )

    tabela = ft.DataTable(
        columns=[
            ft.DataColumn(ft.Text("ID")),
            ft.DataColumn(ft.Text("Nome do Prato")),
            ft.DataColumn(ft.Text("Categoria")),
            ft.DataColumn(ft.Text("Preço R$")),
            ft.DataColumn(ft.Text("Tempo Preparo (min)")),
        ],
        rows=[],
        heading_row_color=ft.Colors.BLUE_100,
        column_spacing=150,
    )

    def carregar_pratos():
        try:
            response = requests.get(API_URL)
            response.raise_for_status()
            pratos = response.json()
            pratos.reverse()
            return pratos
        
        except Exception as err:
            page.snack_bar = ft.SnackBar(ft.Text(f"Erro ao carregar pratos: {err}"))
            page.snack_bar.open = True
            page.update()
            return []

    def aplicar_filtro(e=None):
        pratos = carregar_pratos()
        nome_pesquisa = txt_nome.value.strip().lower()

        pratos_filtrados = []
        for prato in pratos:
            nome_prato = prato.get("nome", "").lower()
            if nome_pesquisa in nome_prato:
                pratos_filtrados.append(prato)

        tabela.rows.clear()
        for prato in pratos_filtrados:
            tabela.rows.append(ft.DataRow(cells=[
                ft.DataCell(ft.Text(str(prato.get("id", "")))),
                ft.DataCell(ft.Text(prato.get("nome", ""))),
                ft.DataCell(ft.Text(prato.get("categoria", ""))),
                ft.DataCell(ft.Text(f'R$ {prato.get("preco", 0):.2f}')),
                ft.DataCell(ft.Text(str(prato.get("tempo_preparo", "")))),
            ]))
        page.update()

    btn_pesquisar = ft.ElevatedButton("Pesquisar", on_click=aplicar_filtro)
    btn_limpar = ft.ElevatedButton("Limpar", on_click=lambda e: limpar_filtros())

    def limpar_filtros():
        txt_nome.value = ""
        txt_nome.update()
        aplicar_filtro()
        page.update()

    layout = ft.Column([
        ft.Text("Pesquisar Pratos por Nome", size=22, weight="bold"),
        ft.Row([txt_nome, btn_pesquisar, btn_limpar], spacing=15),
        ft.Divider(),
        tabela,
    ], expand=True, scroll=ft.ScrollMode.AUTO)

    aplicar_filtro()

    return layout
