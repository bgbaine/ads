import flet as ft
import requests

API_URL = "http://localhost:3000/pratos"

def pesq_cat_prec(page):
    categorias = ["Entrada", "Prato Principal", "Sobremesa", "Bebida"]

    combo_categoria = ft.Dropdown(
        label="Categoria",
        options=[ft.dropdown.Option(c) for c in categorias],
        width=200,
        value=None,
        hint_text="Selecione a categoria",
    )
    txt_preco_min = ft.TextField(label="Preço mínimo R$", width=150, value="")
    txt_preco_max = ft.TextField(label="Preço máximo R$", width=150, value="")

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
        column_spacing=30
    )

    def carregar_pratos():
        try:
            response = requests.get(API_URL)
            response.raise_for_status()
            pratos = response.json()
            return pratos
        except Exception as err:
            page.snack_bar = ft.SnackBar(ft.Text(f"Erro ao carregar pratos: {err}"))
            page.snack_bar.open = True
            page.update()
            return []

    def aplicar_filtro(e=None):
        pratos = carregar_pratos()
        categoria_selecionada = combo_categoria.value
        preco_min = txt_preco_min.value.strip()
        preco_max = txt_preco_max.value.strip()

        def parse_float(v):
            try:
                return float(v.replace(",", "."))
            except:
                return None

        pmin = parse_float(preco_min)
        pmax = parse_float(preco_max)

        pratos_filtrados = []
        for prato in pratos:
            preco = prato.get("preco", 0)
            categoria = prato.get("categoria", "")

            if categoria_selecionada and categoria != categoria_selecionada:
                continue

            if pmin is not None and preco < pmin:
                continue

            if pmax is not None and preco > pmax:
                continue

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
    btn_limpar = ft.ElevatedButton("Limpar Filtros", on_click=lambda e: limpar_filtros())

    def limpar_filtros():
        combo_categoria.value = None
        combo_categoria.update()
        txt_preco_min.value = ""
        txt_preco_max.value = ""
        aplicar_filtro()
        page.update()
        # tabela.rows.clear()

    layout = ft.Column([
        ft.Text("Pesquisar Pratos por Categoria e Preço", size=22, weight="bold"),
        ft.Row([combo_categoria, txt_preco_min, txt_preco_max, btn_pesquisar, btn_limpar], spacing=15),
        ft.Divider(),
        tabela,
    ], expand=True, scroll=ft.ScrollMode.AUTO)

    aplicar_filtro()

    return layout
