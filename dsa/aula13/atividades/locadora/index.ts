// @ts-ignore
import { swaggerUi, specs } from "./swagger";

import express from "express";
import routesClientes from "./routes/clientes";
import routesFilmes from "./routes/filmes";
import routesLocacoes from "./routes/locacoes";
import routesUsuarios from "./routes/usuarios";
import routesLogin from "./routes/login";
import routesSeguranca from "./routes/seguranca";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/clientes", routesClientes);
app.use("/filmes", routesFilmes);
app.use("/locacoes", routesLocacoes);
app.use("/usuarios", routesUsuarios)
app.use("/login", routesLogin)
app.use("/seguranca", routesSeguranca)

app.get("/", (req: any, res: any) => {
  res.send("API: Locadora Avenida");
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});
