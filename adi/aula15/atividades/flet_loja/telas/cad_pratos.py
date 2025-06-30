import flet as ft
import requests

API_URL = "http://localhost:3000/pratos"

def cad_pratos(page):
    txt_nome = ft.TextField(label="Nome do Prato", expand=4)
    txt_categoria = ft.Dropdown(
        label="Categoria",
        options=[
            ft.dropdown.Option("Entrada"),
            ft.dropdown.Option("Prato Principal"),
            ft.dropdown.Option("Sobremesa"),
            ft.dropdown.Option("Bebida"),
        ],
        width=200,
    )
    txt_tempo = ft.TextField(label="Tempo Preparo (min)", expand=2)
    txt_preco = ft.TextField(label="Preço R$", expand=2)

    tabela = ft.DataTable(
        columns=[
            ft.DataColumn(ft.Text("ID")),
            ft.DataColumn(ft.Text("Nome do Prato")),
            ft.DataColumn(ft.Text("Categoria")),
            ft.DataColumn(ft.Text("Tempo Preparo (min)")),
            ft.DataColumn(ft.Text("Preço R$")),
        ],
        rows=[],
        column_spacing=150
    )

    def carregar_pratos_api():
        try:
            response = requests.get(API_URL)
            response.raise_for_status()
            pratos = response.json()
            tabela.rows.clear()
            for p in reversed(pratos):
                tabela.rows.append(ft.DataRow(cells=[
                    ft.DataCell(ft.Text(str(p.get("id", "")))),
                    ft.DataCell(ft.Text(p.get("nome", ""))),
                    ft.DataCell(ft.Text(p.get("categoria", ""))),
                    ft.DataCell(ft.Text(str(p.get("tempo_preparo", "")))),
                    ft.DataCell(ft.Text(f'R$ {p.get("preco", 0):.2f}')),
                ]))
            page.update()
        except Exception as err:
            page.snack_bar = ft.SnackBar(ft.Text(f"Erro ao carregar pratos: {err}"))
            page.snack_bar.open = True
            page.update()

    def enviar_click(e):
        if not txt_nome.value or not txt_categoria.value or not txt_tempo.value or not txt_preco.value:
            e.page.snack_bar.content = ft.Text("Preencha todos os campos")
            e.page.snack_bar.open = True
            e.page.update()
            return
        try:
            prato = {
                "nome": txt_nome.value,
                "categoria": txt_categoria.value,
                "tempo_preparo": int(txt_tempo.value),
                "preco": float(txt_preco.value.replace(",", ".")),
            }
            response = requests.post(API_URL, json=prato)
            response.raise_for_status()
            e.page.snack_bar.content = ft.Text("Prato enviado com sucesso para a API")
            e.page.snack_bar.open = True
            txt_nome.value = ""
            txt_categoria.value = None
            txt_tempo.value = ""
            txt_preco.value = ""
            carregar_pratos_api()
        except ValueError:
            e.page.snack_bar.content = ft.Text("Erro: Tempo preparo deve ser inteiro e preço número válido")
            e.page.snack_bar.open = True
        except requests.exceptions.RequestException as err:
            e.page.snack_bar.content = ft.Text(f"Erro ao enviar: {err}")
            e.page.snack_bar.open = True
        e.page.update()

    def limpar_click(e):
        txt_nome.value = ""
        txt_categoria.value = None
        txt_tempo.value = ""
        txt_preco.value = ""
        e.page.update()

    layout = ft.Column([
        ft.Text("Cadastro de Pratos", size=24, weight="bold"),
        ft.Row([txt_nome, txt_categoria], spacing=10),
        ft.Row([txt_tempo, txt_preco], spacing=10),
        ft.Row([
            ft.ElevatedButton("Enviar", on_click=enviar_click),
            ft.ElevatedButton("Limpar", on_click=limpar_click),
        ], spacing=10),
        ft.Divider(),
        ft.Text("Lista dos Pratos Cadastrados:", size=20, weight="bold"),
        ft.Container(
            content=ft.Column([tabela], scroll=ft.ScrollMode.AUTO, expand=True),
            height=400,
            padding=5,
            border=ft.border.all(1, ft.Colors.GREY_300),
            border_radius=10,
            bgcolor=ft.Colors.GREY_100
        )
    ], spacing=10)

    carregar_pratos_api()
    return layout
