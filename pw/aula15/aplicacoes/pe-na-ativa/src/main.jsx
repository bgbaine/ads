import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Produto from "./Produto";
import Pesquisa from "./Pesquisa";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/produto/:id",
    // element: <ReceitaDetalhes />,
  },
  {
    path: "/pesquisa",
    element: <Pesquisa />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
