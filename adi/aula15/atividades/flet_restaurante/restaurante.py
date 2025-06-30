import flet as ft
from telas.cad_pratos import cad_pratos
from telas.graf_categorias import graf_categorias
from telas.graf_caros import graf_caros
from telas.pesq_cat_prec import pesq_cat_prec
from telas.pesq_nome import pesq_nome

def main(page: ft.Page):
    page.title = "Gestão do Restaurante Avenida"
    page.theme_mode = ft.ThemeMode.LIGHT
    page.padding = 20

    snack = ft.SnackBar(content=ft.Text(""), open=False)
    page.snack_bar = snack
    page.overlay.append(snack)

    conteudo_dinamico = ft.Column()

    def navigate(e):
        rota = e.control.data
        if rota == "cad_pratos":
            conteudo_dinamico.controls = [cad_pratos(page)]
        elif rota == "graf_categorias":
            conteudo_dinamico.controls = [graf_categorias(page)]
        elif rota == "graf_caros":
            conteudo_dinamico.controls = [graf_caros(page)]
        elif rota == "pesq_cat_prec":
            conteudo_dinamico.controls = [pesq_cat_prec(page)]
        elif rota == "pesq_nome":
            conteudo_dinamico.controls = [pesq_nome(page)]
        page.update()

    nav_buttons = ft.Row([
        ft.ElevatedButton("Cadastro de Pratos", data="cad_pratos", on_click=navigate),
        ft.ElevatedButton("Gráfico por Categorias", data="graf_categorias", on_click=navigate),
        ft.ElevatedButton("Gráfico dos Mais Caros", data="graf_caros", on_click=navigate),
        ft.ElevatedButton("Pesquisar por Nome", data="pesq_nome", on_click=navigate),
        ft.ElevatedButton("Pesquisar Categoria e Preço", data="pesq_cat_prec", on_click=navigate),
    ], alignment=ft.MainAxisAlignment.CENTER, wrap=True, spacing=10)

    conteudo_dinamico.controls = [cad_pratos(page)]

    page.add(
        ft.Column([
            ft.Text("Restaurante Avenida", size=30, weight="bold", text_align="center"),
            nav_buttons,
            ft.Divider(),
            conteudo_dinamico,
        ], scroll=ft.ScrollMode.AUTO, expand=True)
    )

ft.app(target=main)
