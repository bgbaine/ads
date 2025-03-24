import express from "express";
import routesFilmes from "./routes/filmes";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/filmes", routesFilmes);

app.get("/", (req: any, res: any) => {
  res.send("API: Cadastro de Filmes");
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});
