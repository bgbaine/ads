import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Pesquisa from "./Pesquisa"
import Comentarios from "./Comentarios"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pesquisa",
    element: <Pesquisa />,
  },
  {
    path: "/comentarios/:filmeId",
    element: <Comentarios />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
