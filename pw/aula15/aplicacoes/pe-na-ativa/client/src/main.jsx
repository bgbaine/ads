import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Produto from "./Produto";
import Pesquisa from "./Pesquisa";
import Carrinho from "./Carrinho";
import Promocoes from "./Promocoes";
import Categoria from "./Categoria";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/produto/:id",
    element: <Produto />,
  },
  {
    path: "/pesquisa",
    element: <Pesquisa />,
  },
  {
    path: "/promocoes",
    element: <Promocoes />,
  },
  {
    path: "/carrinho",
    element: <Carrinho />,
  },
  {
    path: "/categoria/:nomeCategoria",
    element: <Categoria />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
